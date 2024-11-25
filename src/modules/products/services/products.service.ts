import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Product } from '../entities/product.entity';
import { Observable } from 'rxjs';
import { Category } from 'src/modules/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(private wrapperService: WrapperService) { }
  create(data: Product): Observable<Product> {
    if (!data.brand || !data.category) {
      throw new Error('No brand or category provided');
    }
    return this.wrapperService.create(Product, data);
  }

  findAll() {
    return this.wrapperService.findAll(Product);
  }

  findOne(id: number) {
    return this.wrapperService.findOne(Product, { id });
  }

  getBy(query: string, params: string[]) {
    return this.wrapperService.Query(query, params)
  }

  update(id: number, updateProduct: Product) {
    return this.wrapperService.update(Product, id, updateProduct);
  }

  remove(id: string) {
    return this.wrapperService.delete(Product, id);
  }
}
