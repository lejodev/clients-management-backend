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
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiBody({
    description: 'Product Creation information', required: true, isArray: false, type: Product,
    examples: {
      'example':
      {
        value:
        {
          "category": 3,
          "brand": 1,
          "name": "Roof tiles",
          "description": "Roofing tiles made of X material",
          "buyPrice": 42,
          "sellPrice": 56
        }
      }
    }
  })
  @ApiOperation({ summary: 'Create new Product' })
  @ApiCreatedResponse({
    description: "Created successfully",
    type: Product,
    isArray: false
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Roles('Encargado de almacén')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() product: Product) {
    return this.productsService.create(product);
  }

  @Get()
  findAll() {
    console.log('IN');
    
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
