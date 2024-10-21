import { Injectable } from '@nestjs/common';
import { CreateProductsaleDto } from '../dto/create-productsale.dto';
import { UpdateProductsaleDto } from '../dto/update-productsale.dto';
import { Productsale } from '../entities/productsale.entity';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Observable } from 'rxjs';
@Injectable()
export class ProductsaleService {
  constructor(private wrapperService: WrapperService) {}

  create(data: Productsale): Observable<Productsale> {
    return this.wrapperService.create(Productsale, data);
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
