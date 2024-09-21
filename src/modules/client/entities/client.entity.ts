import { Sale } from "src/modules/sale/entities/sale.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbCliente')
export class Client {

    @PrimaryGeneratedColumn({name: 'client_id'})
    id: number;

    @Column({name: 'name'})
    name: string

    @Column({name: 'rating', type: "float"})
    rating: number

    @CreateDateColumn({name: 'created_at', type: "datetime"})
    created_at: Date

    @OneToMany(() => Sale, sale => sale.client)
    sales: Sale[]


}
