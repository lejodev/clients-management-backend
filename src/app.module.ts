import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './modules/client/client.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { Client } from './modules/client/entities/client.entity';
import { WrapperService } from './core/services/wrapper/wrapper.service';
import { SaleModule } from './modules/sale/sale.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'DESKTOP-HRH0QPB',
    port: 1433, // Enable TCP/IP on sqlserver configuration manager
    username: 'sa',
    password: 'pass',
    database: 'DBFerreteria',
    entities: [Client],
    // synchronize: true,
    options: {
      encrypt: true, // Use encryption
      trustServerCertificate: true, // For self-signed certificates
    },
  }), ClientModule, ProductsModule, OrdersModule, SaleModule,],
  controllers: [AppController],
  providers: [AppService, WrapperService],
})
export class AppModule {}
