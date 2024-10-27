import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SellerService } from '../services/seller.service';
import { CreateSellerDto } from '../dto/create-seller.dto';
import { UpdateSellerDto } from '../dto/update-seller.dto';
import { Seller } from '../entities/seller.entity';
import { Observable } from 'rxjs';

@Controller('employees')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  async create(@Body() createSeller: Seller) {
    // let response
    // try {
       return await this.sellerService.create(createSeller);
    //    return response
    // } catch (error) {
    //   return error
    // }
  }

  @Get()
  findAll() {
    return this.sellerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sellerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeller: Seller) {
    return this.sellerService.update(+id, updateSeller);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerService.remove(id);
  }
}
