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
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

// @UseGuards(PermissionGuard)
// @UseGuards(PermissionGuard)
@ApiTags('Employee')
@Controller('users/employee')
export class EmployeeController {
  constructor(private readonly sellerService: EmployeeService) { }

  @ApiBody({
    description: 'employee Creation information', required: true, isArray: false, type: Employee,
    examples: {
      'example':
      {
        value:
        {
          "name": "John",
          "lastName": "Doe",
          "phone": "xxxxxxxxxx",
          "email": "employeeemail@emailservice.com",
          "password": "nicepassword",
          "role": 1
        }
      }
    }
  })
  @ApiOperation({ summary: 'Create new employee' })
  @ApiCreatedResponse({
    description: "Created successfully",
    type: Employee,
    isArray: false
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })

  @Post()
  async create(@Body() createEmployee: Employee) {
    console.log(createEmployee);

    return await this.sellerService.create(createEmployee);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: Employee, isArray: true })
  @Get()
  @Roles('Gerente general')
  @UseGuards(PermissionGuard, RolesGuard)
  findAll(@Request() req) {
    return this.sellerService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific user by its Id' })
  @ApiOkResponse({ type: Employee, isArray: false })
  @UseGuards(PermissionGuard)
  @Get(':id')
  findOne(@Param('id') id: number, @Request() req) {
    console.log(req.user);
    return this.sellerService.findOne(id);
  }

  @ApiOperation({ summary: 'Patch my user info (only owner is allowed)' })
  @ApiBody({
    description: "Part of the body to be changed or the wole info (except the email)",
    type: Employee,
    examples: {
      'example':
      {
        value:
        {
          "name?": "Jimmy",
          "lastName?": "Doe",
          "phone?": "YYYYYYY",
          "password?": "newpassword",
          "role?": 4
        }
      }
    }
  })
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
