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

@Entity('tbproduct')
export class Product {
  @PrimaryGeneratedColumn({ name: 'id_product' })
  id: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'id_category' })
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({name: 'marca'})
  brand: Brand;

  @OneToMany(() => Stock, stock => stock.products)
  stocks: Stock[]

  @ManyToMany(() => Productsale, productSale => productSale.products)
  saleProducts: Productsale[]

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'buy_price', type: 'numeric', precision: 10, scale: 2 })
  buyPrice: number;

  @Column({ name: 'sell_price', type: 'numeric', precision: 10, scale: 2 })
  sellPrice: number;
}
