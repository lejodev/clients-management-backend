import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SellerService } from '../../services/user/user.service';
import { Seller } from '../../entities/seller.entity';
import { Observable } from 'rxjs';
import { PermissionGuard } from '../../guards/permission/permission.guard';
import { AdminGuard } from '../../guards/admin/admin.guard';
import { RolesGuard } from '../../guards/roles-guard/roles-guard.guard';
import { Roles } from '../../decorators/roles/roles.decorator';

// @UseGuards(PermissionGuard)
@Controller('users/employee')
export class SellerController {
  constructor(private readonly sellerService: SellerService) { }

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
  @Roles(5)
  @UseGuards(RolesGuard)
  findAll(@Request() req) {
    console.log(req.user);
    
    return this.sellerService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: number, @Request() req) {
    console.log(req.user);
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
