import { Controller, Get, Post, Body, Patch, Param, Delete, Sse, MessageEvent, Header } from '@nestjs/common';
import { SaleService } from '../services/sale.service';
import { CreateSaleDto } from '../dto/create-sale.dto';
import { UpdateSaleDto } from '../dto/update-sale.dto';
import { interval, map, Observable } from 'rxjs';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  
  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    this.saleService.create(createSaleDto);
    return null;
  }
  
  @Sse('/sse')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  sse(): Observable<MessageEvent>{
    return this.saleService.setSaleSseHandle()
  }

  @Post('/new')
  async newSale(@Body() createsaleDto: CreateSaleDto) {
    return await this.saleService.createSale(createsaleDto)
  }

  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @Get('/report/:date')
  get(@Param('date') date: string){
    console.log(date);
    
    return this.saleService.findByDate(new Date(date))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleService.remove(+id);
  }

}
