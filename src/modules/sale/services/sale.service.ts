import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from '../dto/create-sale.dto';
import { UpdateSaleDto } from '../dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '../entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
  ) {}

  create(createSaleDto: CreateSaleDto) {
    return 'This action adds a new sale';
  }

  createSale(createSaleDto: CreateSaleDto): Promise<any> {
    const { id_producto, cantidad, id_cliente, id_vendedor } = createSaleDto;
    return this.saleRepository.query(
      `EXEC pr_efectuar_venta @id_producto = @0, @cantidad = @1, @id_cliente = @2, @id_vendedor = @3`,
      [id_producto, cantidad, id_cliente, id_vendedor],
    );
  }

  findAll() {
    return `This action returns all sale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  findByDate(date: Date) {
    console.log(date);
    return this.saleRepository.query('EXEC pr_reporte_diario @fecha = @0', [
      date,
    ]);
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
