import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
  MessageEvent,
  Header,
  UseGuards,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SaleService } from '../services/sale.service';
import { CreateSaleDto } from '../dto/create-sale.dto';
import { UpdateSaleDto } from '../dto/update-sale.dto';
import { interval, map, Observable } from 'rxjs';
import { Sale } from '../entities/sale.entity';
import { Roles } from 'src/modules/auth/decorators/roles/roles.decorator';
import { Employee } from 'src/shared/enums/roles.enum';
import { RolesGuard } from 'src/modules/auth/guards/roles-guard/roles-guard.guard';
import { ISaleInfo } from '../interfaces/ISaleInfo.interface';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) { }

  @Post()
  create(@Body() sale: Sale) {
    console.log('IN');

    // this.saleService.create(sale);
    return null;
  }

  // @Sse('/sse')
  // @Header('Content-Type', 'text/event-stream')
  // @Header('Cache-Control', 'no-cache')
  // @Header('Connection', 'keep-alive')
  // sse(): Observable<MessageEvent>{
  //   return this.saleService.setSaleSseHandle()
  // }

  @Roles(Employee.ADMIN, Employee.ASSISTANT, Employee.SELLER, Employee.ADMIN)
  @UseGuards(RolesGuard)
  @Post('/new')
  async newSale(@Body() sale: ISaleInfo) {
    try {
      console.log(sale);

      return await this.saleService.create(sale)
    } catch (error) {
      if (error.message.includes('stock for one')) {
        throw new ConflictException({ message: 'Requested stock exceeds available inventory.' });
      }
      console.log(error);

      throw new InternalServerErrorException({ message: 'An unknown error occurred while processing the sale' })
    }
  }

  @Get()
  findAll() {
    console.log("rererere");

    return this.saleService.findAll();
  }

  @Get(':id_employee')
  getSalesById(@Param('id_employee') employee: number) {
    return this.saleService.findsalesByEmployee(employee);
  }
  // @Get('/report/:date')
  // get(@Param('date') date: string){
  //   console.log(date);

  //   return this.saleService.findByDate(new Date(date))
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.saleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSale: Sale) {
    return this.saleService.update(id, updateSale);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleService.remove(id);
  }
}
