import { Product } from "src/modules/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbMarca')
export class Brand {
    @PrimaryGeneratedColumn({name: 'id_marca'})
    id: number

    @Column({name: 'nombre'})
    name: string

    @OneToMany(() => Product, product => product.brand)
    products: Product[]
}
