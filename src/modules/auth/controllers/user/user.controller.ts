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
import { OwnershipGuard } from '../../guards/ownership-guard/ownership-guard.guard';

// @UseGuards(PermissionGuard)
// @UseGuards(PermissionGuard)
@Controller('users/employee')
export class SellerController {
  constructor(private readonly sellerService: SellerService) { }

  @Post()
  async create(@Body() createSeller: Seller) {
    return await this.sellerService.create(createSeller);
  }

  @Get()
  @Roles('Gerente general')
  @UseGuards(PermissionGuard, RolesGuard)
  findAll(@Request() req) {
    return this.sellerService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Get(':id')
  findOne(@Param('id') id: number, @Request() req) {
    console.log(req.user);
    return this.sellerService.findOne(id);
  }

  //Ownership Guard should be implemented along with the @Roles() custom decorator
  @Roles('Encargado de almacén', 'Gerente general')
  @UseGuards(RolesGuard, PermissionGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeller: Seller) {
    return this.sellerService.update(+id, updateSeller);
  }

  @Roles('Encargado de almacén', 'Gerente general')
  @UseGuards(RolesGuard, PermissionGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerService.remove(id);
  }
}
