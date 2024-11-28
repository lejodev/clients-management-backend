import { Module } from '@nestjs/common';
import { SaleService } from './services/sale.service';
import { SaleController } from './controllers/sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Sale])],
  controllers: [SaleController],
  providers: [SaleService, WrapperService, JwtService],
})
export class SaleModule {}
