import { Injectable, Param } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {

  constructor(@InjectRepository(Client) private clientRepository: Repository<Client>){}

  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  findAll() {
    return this.clientRepository.find()
  }

  findUserExpenseById(id: number) {
    return this.clientRepository.query('EXEC GetDetailedClientInfo @ClientId = @0', [id]);
  }
  

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
