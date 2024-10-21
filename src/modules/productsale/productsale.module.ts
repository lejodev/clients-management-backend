import { Module } from '@nestjs/common';
import { ProductsaleService } from './services/productsale.service';
import { ProductsaleController } from './controllers/productsale.controller';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';

@Module({
  controllers: [ProductsaleController],
  providers: [ProductsaleService, WrapperService],
})
export class ProductsaleModule {}
