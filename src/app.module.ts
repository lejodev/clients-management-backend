import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './modules/client/client.module';
import { ProductsModule } from './modules/products/products.module';
import { Client } from './modules/client/entities/client.entity';
import { WrapperService } from './core/services/wrapper/wrapper.service';
import { SaleModule } from './modules/sale/sale.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BrandModule } from './modules/brand/brand.module';
import { StockModule } from './modules/stock/stock.module';
import { ProductsaleModule } from './modules/productsale/productsale.module';
import { RoleModule } from './modules/role/role.module';
import { Sale } from './modules/sale/entities/sale.entity';
import { Employee } from './modules/auth/entities/employee.entity';
import { Product } from './modules/products/entities/product.entity';
import { Stock } from './modules/stock/entities/stock.entity';
import { Productsale } from './modules/productsale/entities/productsale.entity';
import { Category } from './modules/categories/entities/category.entity';
import { Role } from './modules/role/entities/role.entity';
import { Brand } from './modules/brand/entities/brand.entity';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService:ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'), // Enable TCP/IP on sqlserver configuration manager
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        
        entities: [Client, Sale, Employee, Product, Stock, Productsale, Category, Role, Brand],
        // synchronize: true,
        // options: {
        //   encrypt: true, // Use encryption
        //   trustServerCertificate: true, // For self-signed certificates
        // },
      }),
      inject: [ConfigService]
    }),
    ClientModule,
    ProductsModule,
    SaleModule,
    CategoriesModule,
    BrandModule,
    StockModule,
    ProductsaleModule,
    RoleModule,
    AuthModule,
    SharedModule],
  controllers: [AppController],
  providers: [AppService, WrapperService],
})
export class AppModule { }
