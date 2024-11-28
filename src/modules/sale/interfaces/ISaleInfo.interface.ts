import { IProduct } from "./IProduct.interface";
export interface ISaleInfo {
    id_cliente: number,
    id_vendedor: number,
    products: IProduct[]
}