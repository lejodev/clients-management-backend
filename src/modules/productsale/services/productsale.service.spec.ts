import { Test, TestingModule } from '@nestjs/testing';
import { ProductsaleService } from './productsale.service';

describe('ProductsaleService', () => {
  let service: ProductsaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsaleService],
    }).compile();

    service = module.get<ProductsaleService>(ProductsaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
