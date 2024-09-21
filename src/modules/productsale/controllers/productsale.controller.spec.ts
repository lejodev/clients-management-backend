import { Test, TestingModule } from '@nestjs/testing';
import { ProductsaleController } from './productsale.controller';
import { ProductsaleService } from '../services/productsale.service';

describe('ProductsaleController', () => {
  let controller: ProductsaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsaleController],
      providers: [ProductsaleService],
    }).compile();

    controller = module.get<ProductsaleController>(ProductsaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
