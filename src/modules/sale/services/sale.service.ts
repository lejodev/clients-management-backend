import { Injectable, MessageEvent } from '@nestjs/common';
import { CreateSaleDto } from '../dto/create-sale.dto';
import { UpdateSaleDto } from '../dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '../entities/sale.entity';
import { Repository } from 'typeorm';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
  ) {}

  create(createSaleDto: CreateSaleDto) {
    return 'This action adds a new sale';
  }

  findAll() {
    return this.saleRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  findByDate(date: Date) {
    console.log(date);
    return this.saleRepository.query('EXEC pr_reporte_diario @fecha = @0', [
      // execute stored procedure directly from database, call wih arguments
      date,
    ]);
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }

  setSaleSseHandle() {
    let saleEvents: Subject<MessageEvent> = new Subject();
    return saleEvents.asObservable();
  }

  manageEventUpdates() {
    const query = this.saleRepository.query(
      'SELECT percent_complete FROM sys.dm_exec_requests WHERE COMMAND = "pr_efectuar_venta"'
    );

    let event: MessageEvent = {
      id: '0',
      data:{name: 'carechimba'},
      retry: 1000
    } 
    

    console.log(query);
  }

  createSale(createSaleDto: CreateSaleDto): Promise<any> {

    // console.log('Inside sale creation')
    this.manageEventUpdates();

    const { id_producto, cantidad, id_cliente, id_vendedor } = createSaleDto;
    return this.saleRepository.query(
      `EXEC DBFerreteria.pr_efectuar_venta @id_producto = @0, @cantidad = @1, @id_cliente = @2, @id_vendedor = @3`,
      [id_producto, cantidad, id_cliente, id_vendedor],
    );
  }
}
