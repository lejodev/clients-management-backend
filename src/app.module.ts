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
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // host: process.env.DB_HOST,  // Use the env variable for the host
      // port: parseInt(process.env.DB_PORT, 10),  // Use the env variable for the port
      // username: process.env.DB_USERNAME,  // Use the env variable for the username
      // password: process.env.DB_PASSWORD,  // Use the env variable for the password
      // database: process.env.DB_DATABASE,  // Use the env variable for the database
      entities: [Client, Sale, Employee, Product, Stock, Productsale, Category, Role, Brand],
      synchronize: true,  // Only for development, do not use in production
    })
    ,
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
