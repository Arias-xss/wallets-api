import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  type DatabaseClient,
  InjectDatabase,
  eq,
  asc,
  desc,
  sql,
} from '../database';
import type { CreateWalletDto } from './dto/create-wallet.dto';
import type { UpdateWalletDto } from './dto/update-wallet.dto';
import { type Wallet, Wallets } from './wallets.schema';
import { EtherscanService } from '../etherscan/etherscan.service';
import { FindAllWalletsDto } from './dto/find-all-wallets.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectDatabase() private readonly db: DatabaseClient,
    private readonly etherscan: EtherscanService,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    if (await this.wasAlreadyAdded(createWalletDto.address)) {
      throw new ConflictException('Wallet already added');
    }

    const balanceResponse = await this.etherscan.accountBalance(
      createWalletDto.address,
    );

    if (balanceResponse.message === 'NOTOK') {
      throw new BadRequestException(balanceResponse.result);
    }

    const [wallet] = await this.db
      .insert(Wallets)
      .values({
        address: createWalletDto.address,
        favorite: false,
        old: await this.walletIsOld(createWalletDto.address),
        balance: balanceResponse.result,
      })
      .returning();

    return wallet;
  }

  private async wasAlreadyAdded(address: string): Promise<boolean> {
    const [result] = await this.db
      .select({ address: Wallets.address })
      .from(Wallets)
      .where(eq(Wallets.address, address));

    return Boolean(result);
  }

  private async walletIsOld(address: string): Promise<boolean> {
    const txsResponse = await this.etherscan.firstTransaction(address);
    if (txsResponse.message === 'NOTOK') {
      throw new BadGatewayException(txsResponse.result);
    }

    if (txsResponse.result.length === 0) {
      return false;
    }

    const blockNumber = txsResponse.result[0].blockNumber;
    const blockResponse = await this.etherscan.blockByNumber(blockNumber);
    if (blockResponse.message === 'NOTOK') {
      throw new BadGatewayException(blockResponse.result);
    }

    const txDate = Number(blockResponse.result.timeStamp);
    const now = Date.now() / 1000;
    const yearInSeconds = 31536000;
    return now - txDate > yearInSeconds;
  }

  async findAll(dto: FindAllWalletsDto): Promise<Array<Wallet>> {
    const sortBy = {
      favorite: desc(Wallets.favorite),
      new: desc(sql`ROWID`),
      first: asc(sql`ROWID`),
      undefined: asc(sql`ROWID`),
    };

    const results = await this.db
      .select()
      .from(Wallets)
      .orderBy(sortBy[dto.sort]);

    return results;
  }

  async findOne(address: string): Promise<Wallet> {
    const [wallet] = await this.db
      .select()
      .from(Wallets)
      .where(eq(Wallets.address, address));

    if (wallet === undefined) {
      throw new NotFoundException(
        `Wallet with address ${address} was not found`,
      );
    }

    return wallet;
  }

  async refreshBalance(address: string): Promise<Wallet> {
    const response = await this.etherscan.accountBalance(address);
    if (response.message !== 'OK') {
      throw new BadRequestException(response.result);
    }

    return this.update(address, { balance: response.result });
  }

  async update(
    address: string,
    updateWalletDto: UpdateWalletDto | Pick<Wallet, 'balance'>,
  ): Promise<Wallet> {
    const [wallet] = await this.db
      .update(Wallets)
      .set(updateWalletDto)
      .where(eq(Wallets.address, address))
      .returning();

    if (wallet === undefined) {
      throw new NotFoundException(
        `Wallet with address ${address} was not found`,
      );
    }

    return wallet;
  }

  async remove(address: string): Promise<void> {
    const result = await this.db
      .delete(Wallets)
      .where(eq(Wallets.address, address));

    if (result.changes > 0) {
      return;
    }

    throw new NotFoundException(`Wallet with address ${address} was not found`);
  }
}
