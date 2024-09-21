import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsaleService } from '../services/productsale.service';
import { CreateProductsaleDto } from '../dto/create-productsale.dto';
import { UpdateProductsaleDto } from '../dto/update-productsale.dto';

@Controller('productsale')
export class ProductsaleController {
  constructor(private readonly productsaleService: ProductsaleService) {}

  @Post()
  create(@Body() createProductsaleDto: CreateProductsaleDto) {
    return this.productsaleService.create(createProductsaleDto);
  }

  @Get()
  findAll() {
    return this.productsaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsaleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsaleDto: UpdateProductsaleDto) {
    return this.productsaleService.update(+id, updateProductsaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsaleService.remove(+id);
  }
}