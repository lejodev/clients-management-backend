import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private wrapperService: WrapperService) {}
  create() {
    return `This action creates a product`;
  }
  
  findAll() {
    return this.wrapperService.findAll(Product)
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
