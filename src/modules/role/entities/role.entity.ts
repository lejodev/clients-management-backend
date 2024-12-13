import { Employee } from "src/modules/auth/entities/employee.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbrole')
export class Role {
    @PrimaryGeneratedColumn({name: 'id_role'})
    id: number

    @Column({name: 'role_name', type: 'text'})
    name: string

    @OneToMany(() => Employee, employee => employee.role)
    employees: Employee[]
}
