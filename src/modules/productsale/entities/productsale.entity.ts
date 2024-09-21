import { Product } from "src/modules/products/entities/product.entity";
import { Sale } from "src/modules/sale/entities/sale.entity";
import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('producto_venta')
export class Productsale {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @ManyToOne(() => Sale, sale => sale.saleProducts)
    sales: Sale

    @ManyToOne(() => Product, product => product.saleProducts)
    products: Product
}
