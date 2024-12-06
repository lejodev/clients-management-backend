import { Injectable, MessageEvent } from '@nestjs/common';
import { CreateSaleDto } from '../dto/create-sale.dto';
import { UpdateSaleDto } from '../dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '../entities/sale.entity';
import { Repository } from 'typeorm';
import { Observable, Subject } from 'rxjs';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Stock } from 'src/modules/stock/entities/stock.entity';
import { ISaleInfo } from '../interfaces/ISaleInfo.interface';

@Injectable()
export class SaleService {
  constructor(private wrapperService: WrapperService) { }

  async create(sale: ISaleInfo) {
    console.log("saleeeeeee", sale);
    const products = JSON.stringify(sale.products)
    return this.wrapperService.Query('EXEC prNewSale @id_cliente = @0,	@id_vendedor = @1,	@JSONProducts = @2 ', [sale.id_cliente, sale.id_vendedor, products])

  }


  findAll() {
    return this.wrapperService.findAll(Sale);
  }

  findOne(id: number): Observable<Sale> {
    try {
      const sale = this.wrapperService.findOne(Sale, { id });

      if (!sale) {
        throw new Error("No sale found")
      }

      return sale

    } catch (error) {
      throw error(error)
    }
  }

  // findByDate(date: Date) {
  //   console.log(date);
  //   return this.saleRepository.query('EXEC pr_reporte_diario @fecha = @0', [
  //     // execute stored procedure directly from database, call wih arguments
  //     date,
  //   ]);
  // }

  update(id: number, updateSale: Sale) {
    return this.wrapperService.update(Sale, id, updateSale);
  }

  remove(id: string) {
    return this.wrapperService.delete(Sale, id);
  }

  // setSaleSseHandle() {
  //   let saleEvents: Subject<MessageEvent> = new Subject();
  //   return saleEvents.asObservable();
  // }

  // manageEventUpdates() {
  //   const query = this.saleRepository.query(
  //     'SELECT percent_complete FROM sys.dm_exec_requests WHERE COMMAND = "pr_efectuar_venta"',
  //   );

  //   let event: MessageEvent = {
  //     id: '0',
  //     data: { name: 'carechimba' },
  //     retry: 1000,
  //   };

  //   console.log(query);
  // }

  // createSale(createSaleDto: CreateSaleDto): Promise<any> {
  //   // console.log('Inside sale creation')
  //   this.manageEventUpdates();

  //   const { id_producto, cantidad, id_cliente, id_vendedor } = createSaleDto;
  //   return this.saleRepository.query(
  //     `EXEC DBFerreteria.pr_efectuar_venta @id_producto = @0, @cantidad = @1, @id_cliente = @2, @id_vendedor = @3`,
  //     [id_producto, cantidad, id_cliente, id_vendedor],
  //   );
  // }
}
