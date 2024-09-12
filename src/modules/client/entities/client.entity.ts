import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbclient')
export class Client {

    @PrimaryGeneratedColumn({name: 'client_id'})
    id: number;

    @Column({name: 'name'})
    name: string

    @Column({name: 'rating', type: "float"})
    rating: number

    @CreateDateColumn({name: 'created_at', type: "datetime"})
    created_at: Date
}
