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
import { EmployeeService } from '../../services/user/user.service';
import { Employee } from '../../entities/employee.entity';
import { Observable } from 'rxjs';
import { PermissionGuard } from '../../guards/permission/permission.guard';
import { AdminGuard } from '../../guards/admin/admin.guard';
import { RolesGuard } from '../../guards/roles-guard/roles-guard.guard';
import { Roles } from '../../decorators/roles/roles.decorator';
import { OwnershipGuard } from '../../guards/ownership-guard/ownership-guard.guard';

// @UseGuards(PermissionGuard)
// @UseGuards(PermissionGuard)
@Controller('users/employee')
export class EmployeeController {
  constructor(private readonly sellerService: EmployeeService) { }

  @Post()
  async create(@Body() createEmployee: Employee) {
    console.log(createEmployee);
    
    return await this.sellerService.create(createEmployee);
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
  update(@Param('id') id: string, @Body() updateEmployee: Employee) {
    return this.sellerService.update(+id, updateEmployee);
  }

  @Roles('Encargado de almacén', 'Gerente general')
  @UseGuards(RolesGuard, PermissionGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerService.remove(id);
  }
}
