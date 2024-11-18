import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Seller } from '../../entities/seller.entity';
import { Observable } from 'rxjs';
@Injectable()
export class SellerService {
  constructor(private wrapperService: WrapperService) {}

  async create(createSeller: Seller): Promise<Seller> {
    try {
      const create = await this.wrapperService.toPromise(
        this.wrapperService.create(Seller, createSeller),
      );
      return create;
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    console.log("service");
    
    return this.wrapperService.findAll(Seller);
  }

  async findOne(id: number): Promise<Seller | string> {
    const user = await this.wrapperService.toPromise(
      this.wrapperService.findOne(Seller, { id }),
    );
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  update(id: number, updateSeller: Seller) {
    return this.wrapperService.update(Seller, id, updateSeller);
  }

  remove(id: string) {
    return this.wrapperService.delete(Seller, id);
  }
}
