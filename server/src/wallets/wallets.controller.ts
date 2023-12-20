import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { FindAllWalletsDto } from './dto/find-all-wallets.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  findAll(@Query() dto: FindAllWalletsDto) {
    return this.walletsService.findAll(dto);
  }

  @Get(':address')
  findOne(@Param('address') address: string) {
    return this.walletsService.findOne(address);
  }

  @Patch(':address')
  update(
    @Param('address') address: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    return this.walletsService.update(address, updateWalletDto);
  }

  @Post(':address/refresh-balance')
  @HttpCode(200)
  refreshBalance(@Param('address') address: string) {
    return this.walletsService.refreshBalance(address);
  }

  @Delete(':address')
  @HttpCode(204)
  remove(@Param('address') address: string) {
    return this.walletsService.remove(address);
  }
}
