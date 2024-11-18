import { Injectable, NotFoundException } from '@nestjs/common';
import { Seller } from '../../entities/seller.entity';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { SellerService } from '../user/user.service';

@Injectable()
export class AuthService {

    constructor(private wrapperService: WrapperService, private sellerService: SellerService) { }

    async login(data: Seller) {
        try {
            const user = await this.wrapperService.toPromise(this.wrapperService.findOne(Seller, { email: data.email }))

            if (user == null) {
                throw new NotFoundException('User doesnt exists')
            }

            return user

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            console.log(error);
            throw new Error('Unknown error during login')

        }


        // return this.wrapperService.findOne(Seller, [{ 'email': data.email }])
    }
}
