import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { CurrencyExchangesService } from './currency-exchanges.service';
import { CreateCurrencyExchangeDto } from './dto/create-currency-exchange.dto';
import { UpdateCurrencyExchangeDto } from './dto/update-currency-exchange.dto';

@Controller('currency-exchanges')
export class CurrencyExchangesController {
  constructor(
    private readonly currencyExchangeService: CurrencyExchangesService,
  ) {}

  @Post()
  create(@Body() createExchangeDto: CreateCurrencyExchangeDto) {
    return this.currencyExchangeService.create(createExchangeDto);
  }

  @Get()
  findAll() {
    return this.currencyExchangeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.currencyExchangeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExchangeDto: UpdateCurrencyExchangeDto,
  ) {
    return this.currencyExchangeService.update(id, updateExchangeDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.currencyExchangeService.remove(id);
  }
}
