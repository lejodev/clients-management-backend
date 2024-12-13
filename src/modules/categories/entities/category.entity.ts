import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbcategory')
export class Category {
  @PrimaryGeneratedColumn({ name: 'id_category' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[]

}
