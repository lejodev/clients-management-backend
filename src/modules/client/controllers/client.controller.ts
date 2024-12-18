import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Brand } from 'src/modules/brand/entities/brand.entity';

@ApiTags("Client")
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiBody({
    description: 'Create new brand', required: true, isArray: false, type: Brand,
    examples: {
      'example':
      {
        value:
        {
          "name": "Karcher",
        }
      }
    }
  })
  @ApiOperation({ summary: 'Create new brand' })
  @ApiCreatedResponse({
    description: "Created successfully",
    type: Brand,
    isArray: false
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get('expenses-by-user/:id')
  findOne(@Param('id') id: number) {
    return this.clientService.findUserExpenseById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
