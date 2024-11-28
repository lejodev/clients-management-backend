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
import { Seller } from './modules/auth/entities/seller.entity';
import { Product } from './modules/products/entities/product.entity';
import { Stock } from './modules/stock/entities/stock.entity';
import { Productsale } from './modules/productsale/entities/productsale.entity';
import { Category } from './modules/categories/entities/category.entity';
import { Role } from './modules/role/entities/role.entity';
import { Brand } from './modules/brand/entities/brand.entity';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'localhost',
    port: 1433, // Enable TCP/IP on sqlserver configuration manager
    username: 'sa',
    password: 'pass',
    database: 'DBFerreteria',
    entities: [Client, Sale, Seller, Product, Stock, Productsale, Category, Role, Brand],
    // synchronize: true,
    options: {
      encrypt: true, // Use encryption
      trustServerCertificate: true, // For self-signed certificates
    },
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
