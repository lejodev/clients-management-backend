import { Client } from 'src/modules/client/entities/client.entity';
import { Productsale } from 'src/modules/productsale/entities/productsale.entity';
import { Employee } from 'src/modules/auth/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tbsale' })
export class Sale {
  @PrimaryGeneratedColumn({ name: 'id_sale' })
  id: number;

  @ManyToOne(() => Client, (client) => client.sales,
    {  cascade: true }
  )
  @JoinColumn({ name: 'id_client' })
  client: Client;

  @ManyToOne(() => Employee, (employee) => employee.sales, { eager: true })
  @JoinColumn({ name: 'id_employee' })
  employee: Employee;

  @Column({ name: 'date', type: 'date' })
  saleDate: Date;

  @OneToMany(() => Productsale, (productsSale) => productsSale.sales, {
    eager: true,
  })
  saleProducts: Productsale[];
}
