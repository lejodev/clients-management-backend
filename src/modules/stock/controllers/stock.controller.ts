import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StockService } from '../services/stock.service';
import { CreateStockDto } from '../dto/create-stock.dto';
import { UpdateStockDto } from '../dto/update-stock.dto';
import { Stock } from '../entities/stock.entity';
import { Roles } from 'src/modules/auth/decorators/roles/roles.decorator';
import { Employee } from 'src/shared/enums/roles.enum';
import { RolesGuard } from 'src/modules/auth/guards/roles-guard/roles-guard.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Post()
  create(@Body() createStock: Stock) {
    return this.stockService.create(createStock);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Roles(Employee.ADMIN, Employee.ASSISTANT, Employee.CHIEF)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStock: Stock) {

    const stock = this
    console.log(updateStock);

    return this.stockService.update(+id, updateStock)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
