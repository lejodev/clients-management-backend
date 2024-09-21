import { Module } from '@nestjs/common';
import { ProductsaleService } from './services/productsale.service';
import { ProductsaleController } from './controllers/productsale.controller';

@Module({
  controllers: [ProductsaleController],
  providers: [ProductsaleService],
})
export class ProductsaleModule {}
