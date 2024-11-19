import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Seller } from '../../entities/seller.entity';
import { Observable } from 'rxjs';
import { FindOptionsWhere } from 'typeorm';
import * as bcrypt from "bcrypt"
@Injectable()
export class SellerService {
    constructor(private wrapperService: WrapperService) { }

    saltRounds: number = 10;

    async create(createSeller: Seller): Promise<Seller> {
        try {
            createSeller.password = this.hashSyncPassword(createSeller.password)
            console.log(createSeller);

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

    // Gets by FindOptionsWhere condition
    findBy(condition: FindOptionsWhere<Seller>) {
        return this.wrapperService.findOne(Seller, condition)
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

    hashSyncPassword(password: string) {
        return bcrypt.hashSync(password, this.saltRounds)
    }

    async comparePassword(hashedPassword: string, inputPassword: string) {
        return await bcrypt.compare(inputPassword, hashedPassword)

    }

}
