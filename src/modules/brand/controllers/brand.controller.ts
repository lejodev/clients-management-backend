import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
} from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { interval, map, Observable, tap } from 'rxjs';

type carService = { data: { name: { carNo: number } } };
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  // @Post()
  // create(@Body() createBrandDto: CreateBrandDto) {
  //   return this.brandService.create(createBrandDto);
  // }

  // @Get()
  // findAll() {
  //   return this.brandService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.brandService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
  //   return this.brandService.update(+id, updateBrandDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.brandService.remove(+id);
  // }

  @Sse('/cars')
  endServices(): Observable<carService> {
    let name = { carNo: 0 };
    return interval(1000).pipe(
      tap(() => {
        name.carNo += Math.floor(Math.random() * 4) + 1;
      }),
      map(() => ({ data: { name } }))
    );
  }
}
