import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsaleDto } from './create-productsale.dto';

export class UpdateProductsaleDto extends PartialType(CreateProductsaleDto) {}
