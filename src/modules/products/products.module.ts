import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, WrapperService],
})
export class ProductsModule {}
