import { Role } from 'src/modules/role/entities/role.entity';
import { Sale } from 'src/modules/sale/entities/sale.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbVendedor')
export class Seller {
  @PrimaryGeneratedColumn({ name: 'id_vendedor' })
  id: number;

  @OneToMany(() => Sale, (sale) => sale.seller)
  sales: Sale[];

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'rating', type: 'float' })
  rating: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  created_at: Date;

  @ManyToOne(() => Role, (role) => role.sellers)
  role: Role;
}
