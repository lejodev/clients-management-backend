import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Productsale } from 'src/modules/productsale/entities/productsale.entity';
import { Sale } from 'src/modules/sale/entities/sale.entity';
import { Stock } from 'src/modules/stock/entities/stock.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbProducto')
export class Product {
  @PrimaryGeneratedColumn({ name: 'id_producto' })
  id: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'id_categoria' })
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({name: 'marca'})
  brand: Brand;

  @OneToMany(() => Stock, stock => stock.products)
  stocks: Stock[]

  @ManyToMany(() => Productsale, productSale => productSale.products)
  saleProducts: Productsale[]

  @Column({ name: 'nombre' })
  name: string;

  @Column({ name: 'descripcion' })
  description: string;

  @Column({ name: 'precio_compra', type: 'decimal', precision: 10, scale: 2 })
  buyPrice: number;

  @Column({ name: 'precio_venta', type: 'decimal', precision: 10, scale: 2 })
  sellPrice: number;
}
