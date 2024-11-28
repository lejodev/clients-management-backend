import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "tbInventario"})
export class Stock {
  @PrimaryGeneratedColumn({ name: 'id_inventario' })
  id: number;

  @ManyToOne(() =>Product, product => product.stocks)
  @JoinColumn({name: 'id_producto'})
  products: Product

  @Column({ name: 'cantidad' })
  amount: number;

  @Column({ name: 'ultima_actualizacion' })
  updatedAt: Date;
}
