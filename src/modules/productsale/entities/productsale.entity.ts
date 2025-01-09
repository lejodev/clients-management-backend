import { Product } from "src/modules/products/entities/product.entity";
import { Sale } from "src/modules/sale/entities/sale.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('productsale')
export class Productsale {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @ManyToOne(() => Sale, sale => sale.saleProducts)
    @JoinColumn({ name: 'id_sale' })
    sales: Sale

    @ManyToOne(() => Product, product => product.saleProducts)
    @JoinColumn({ name: 'id_product' })
    products: Product

    @Column({name: 'amount'})
    amount: string

    @Column({name: 'sale_price', type: 'numeric'})
    sale_price: number
}
