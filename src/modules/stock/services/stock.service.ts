import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from '../dto/create-stock.dto';
import { UpdateStockDto } from '../dto/update-stock.dto';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Stock } from '../entities/stock.entity';
import { firstValueFrom } from 'rxjs';
import { FindOptionsWhere } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';

@Injectable()
export class StockService {

  constructor(private wrapperService: WrapperService) { }

  create(createStock: Stock) {

  }

  findAll() {
    return this.wrapperService.findAll(Stock)
  }

  findOne(id: number) {
    return this.wrapperService.findOne(Stock, { id: id })
  }

  findByName(condition: FindOptionsWhere<Stock>) {
    return this.wrapperService.findOne(Stock, condition)
  }

  async update(id: number, updatedStock: Stock) {
    const stock = await firstValueFrom(this.wrapperService.findOne(Stock, { id: id }))
    const date = new Date()
    updatedStock.updatedAt = date

    console.log(updatedStock, "updatedStock*****");

    if (!stock) {
      throw new Error(`Stock with id ${id} not found`);
    }
    stock.amount += (updatedStock.amount ?? 0)


    if (updatedStock.products?.id) {
      try {
        const productId = updatedStock.products.id
        await this.wrapperService.update(Product, { id: productId }, updatedStock.products)
      } catch (error) {
        throw new NotFoundException(`Product with id ${updatedStock.products.id} not found`)
      }
    }
    console.log(updatedStock, "updatedStock*****");

    const { products, ...filteredObj } = updatedStock
    console.log(filteredObj);

    try {
      return this.wrapperService.update(Stock, { id: id }, filteredObj)
    } catch (error) {
      throw new Error(`Error updating stock with id ${id}`)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
