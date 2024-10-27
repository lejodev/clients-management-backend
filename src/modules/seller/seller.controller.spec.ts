import { Test, TestingModule } from '@nestjs/testing';
import { SellerController } from './controllers/seller.controller';
import { SellerService } from './services/seller.service';

describe('SellerController', () => {
  let controller: SellerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerController],
      providers: [SellerService],
    }).compile();

    controller = module.get<SellerController>(SellerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
