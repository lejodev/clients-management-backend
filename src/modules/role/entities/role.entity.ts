import { Seller } from "src/modules/seller/entities/seller.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbCargo')
export class Role {
    @PrimaryGeneratedColumn({name: 'id_cargo'})
    id: number

    @Column({name: 'nombre_cargo'})
    name: string

    @OneToMany(() => Seller, seller => seller.role)
    sellers: Seller[]
}
