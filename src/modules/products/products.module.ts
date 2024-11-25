import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtHelper } from '../auth/services/jwt/jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: "temporaryJWTSECRET",
      signOptions: {
        expiresIn: "1day"
      }
    })
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    WrapperService,
    JwtService,
    JwtHelper],
})
export class ProductsModule { }
