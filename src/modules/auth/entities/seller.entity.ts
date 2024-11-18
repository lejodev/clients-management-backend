import { Role } from 'src/modules/role/entities/role.entity';
import { Sale } from 'src/modules/sale/entities/sale.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbVendedor')
export class Seller {
  @PrimaryGeneratedColumn({ name: 'id_vendedor' })
  id: number;

  @Column({ name: 'nombre', nullable: false, unique: true })
  name: string;

  @Column({ name: 'apellido', type: 'nvarchar', nullable: false, unique: true })
  lastName: string;

  @Column({ name: 'telefono', type: 'varchar', nullable: false, unique: true })
  phone: string;

  @Column({ name: 'email', type: 'nvarchar', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', type: 'nvarchar', nullable: false })
  password: string;

  @OneToMany(() => Sale, (sale) => sale.seller)
  sales: Sale[];

  @ManyToOne(() => Role, (role) => role.sellers, { eager: true })
  @JoinColumn({ name: 'id_cargo' })
  role: Role;
}
