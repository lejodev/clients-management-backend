import { Module } from '@nestjs/common';
import { SellerService } from './services/seller.service';
import { SellerController } from './controllers/seller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seller])],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
