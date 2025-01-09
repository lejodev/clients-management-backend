import { Module } from '@nestjs/common';
import { StockService } from './services/stock.service';
import { StockController } from './controllers/stock.controller';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), AuthModule],
  controllers: [StockController],
  providers: [
    StockService,
    WrapperService],
})
export class StockModule { }
