import { Sale } from "src/modules/sale/entities/sale.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbclient')
export class Client {

    @PrimaryGeneratedColumn({name: 'client_id'})
    id: number;

    @Column({name: 'client_name'})
    name: string

    @Column({name: 'last_name', type: 'text'})
    lastname: string

    @Column({name: 'address', type: 'text'})
    address: string

    @Column({name: 'phone', type: 'text'})
    rating: number

    @OneToMany(() => Sale, sale => sale.client)
    sales: Sale[]


}
