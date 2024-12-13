import { Role } from 'src/modules/role/entities/role.entity';
import { Sale } from 'src/modules/sale/entities/sale.entity';
import { text } from 'stream/consumers';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbemployee')
export class Employee {
  @PrimaryGeneratedColumn({ name: 'id_employee' })
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'last_name', type: 'text', nullable: false })
  lastName: string;

  @Column({ name: 'phone', type: 'text', nullable: false, unique: true })
  phone: string;

  @Column({ name: 'email', type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;

  @OneToMany(() => Sale, (sale) => sale.employee)
  sales: Sale[];

  @ManyToOne(() => Role, (role) => role.employees, { eager: true })
  @JoinColumn({ name: 'id_role' })
  role: Role;
}
