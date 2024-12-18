import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';

@ApiTags("Role")
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiBody({
    description: 'Role creation information', required: true, isArray: false, type: Role,
    examples: {
      'example':
      {
        value:
        {
          "role_name": "new role"
        }
      }
    }
  })
  @ApiOperation({ summary: 'Create new role' })
  @ApiCreatedResponse({
    description: "Created successfully",
    type: Role,
    isArray: false
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
