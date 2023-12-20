import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { DatabaseModule } from '../database';
import { EtherscanModule } from '../etherscan/etherscan.module';

@Module({
  imports: [DatabaseModule, EtherscanModule],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
