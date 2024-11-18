import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { SellerController } from './controllers/user/user.controller';
import { AuthService } from './services/auth/auth.service';
import { SellerService } from './services/user/user.service';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Seller])],
  controllers: [
    AuthController,
    SellerController],
  providers: [
    AuthService, 
    WrapperService,
    SellerService]
})
export class AuthModule { }
