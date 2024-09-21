import { Injectable } from '@nestjs/common';
import { CreateProductsaleDto } from '../dto/create-productsale.dto';
import { UpdateProductsaleDto } from '../dto/update-productsale.dto';
@Injectable()
export class ProductsaleService {
  create(createProductsaleDto: CreateProductsaleDto) {
    return 'This action adds a new productsale';
  }

  findAll() {
    return `This action returns all productsale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsale`;
  }

  update(id: number, updateProductsaleDto: UpdateProductsaleDto) {
    return `This action updates a #${id} productsale`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsale`;
  }
}
