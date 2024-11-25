import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { Roles } from 'src/modules/auth/decorators/roles/roles.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles-guard/roles-guard.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Roles('Encargado de almacén')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() product: Product) {
    return this.productsService.create(product);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  // @Get('/getBy/:category')
  // getBy(@Param('category') category: string) {
  //   return this.productsService.getBy(category, )
  // }

  @Roles('Encargado de almacén')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() data: Product) {
    return this.productsService.update(id, data);
  }

  @Roles('Encargado de almacén')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
