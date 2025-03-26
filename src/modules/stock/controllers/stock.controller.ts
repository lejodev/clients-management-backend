import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { StockService } from '../services/stock.service';
import { CreateStockDto } from '../dto/create-stock.dto';
import { UpdateStockDto } from '../dto/update-stock.dto';
import { Stock } from '../entities/stock.entity';
import { Roles } from 'src/modules/auth/decorators/roles/roles.decorator';
import { Employee } from 'src/shared/enums/roles.enum';
import { RolesGuard } from 'src/modules/auth/guards/roles-guard/roles-guard.guard';
import { JwtService } from '@nestjs/jwt';
import { ProductsService } from 'src/modules/products/services/products.service';

@Controller('stock')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private productService: ProductsService
  ) { }

  @Post()
  create(@Body() createStock: Stock) {
    return this.stockService.create(createStock);
  }

  @Get('all')
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Get(':name')
  findByName(@Param('name') products: Stock) {
    return this.stockService.findByName({ products })
  }


  @Roles(Employee.ADMIN, Employee.ASSISTANT, Employee.CHIEF)
  @UseGuards(RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStock: Stock) {
    const stockId = parseInt(id, 10)
    if (isNaN(stockId)) {
      throw new BadRequestException(`Invalid stock id ${id}`)
    }
    return await this.stockService.update(+id, updateStock)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
