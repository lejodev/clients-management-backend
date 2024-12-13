import { IProduct } from "./IProduct.interface";
export interface ISaleInfo {
    id_user: number,
    id_employee: number,
    products: IProduct[]
}