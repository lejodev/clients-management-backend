import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbCategorias')
export class Category {
  @PrimaryGeneratedColumn({ name: 'id_categoria' })
  id: number;

  @Column({ name: 'nombre' })
  name: string;

  @Column({ name: 'descripcion' })
  description: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[]

}
