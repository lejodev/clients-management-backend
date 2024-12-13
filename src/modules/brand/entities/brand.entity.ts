import { Product } from "src/modules/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbbrand')
export class Brand {
    @PrimaryGeneratedColumn({name: 'id_brand'})
    id: number

    @Column({name: 'name'})
    name: string

    @OneToMany(() => Product, product => product.brand)
    products: Product[]
}
