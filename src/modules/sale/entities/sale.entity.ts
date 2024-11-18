import { Client } from 'src/modules/client/entities/client.entity';
import { Productsale } from 'src/modules/productsale/entities/productsale.entity';
import { Seller } from 'src/modules/seller/entities/seller.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tbVenta' })
export class Sale {
  @PrimaryGeneratedColumn({ name: 'id_venta' })
  id: number;

  @Column({ name: 'fecha_venta' })
  saleDate: Date;

  @ManyToOne(() => Client, (client) => client.sales)
  @JoinColumn({ name: 'id_cliente' })
  client: Client;

  @ManyToOne(() => Seller, (seller) => seller.sales)
  @JoinColumn({ name: 'id_vendedor' })
  seller: Seller;

  @ManyToMany(() => Productsale, (productsSale) => productsSale.sales, {
    // eager: true,
  })
  @JoinTable()
  saleProducts: Productsale[];
}
