import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "tbstock"})
export class Stock {
  @PrimaryGeneratedColumn({ name: 'id_stock' })
  id: number;

  @ManyToOne(() =>Product, product => product.stocks, {eager: true})
  @JoinColumn({name: 'id_product'})
  products: Product

  @Column({ name: 'stockamount' })
  amount: number;

  @Column({ name: 'updatedat', type: 'timestamp with time zone' })
  updatedAt: Date;
}
