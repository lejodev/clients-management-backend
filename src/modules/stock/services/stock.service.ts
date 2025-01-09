import { Injectable } from '@nestjs/common';
import { CreateStockDto } from '../dto/create-stock.dto';
import { UpdateStockDto } from '../dto/update-stock.dto';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Stock } from '../entities/stock.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StockService {

  constructor(private wrapperService: WrapperService) { }

  create(createStock: Stock) {

  }

  findAll() {
    return `This action returns all stock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  async update(id: number, updatedStock: Stock) {
    const stock = await firstValueFrom(this.wrapperService.findOne(Stock, { id: id }))

    console.log(stock);

    if (!stock) {
      throw new Error(`Stock with id ${id} not found`);
    }
    updatedStock.amount += stock.amount

    return this.wrapperService.update(Stock, { id: id }, updatedStock)
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
