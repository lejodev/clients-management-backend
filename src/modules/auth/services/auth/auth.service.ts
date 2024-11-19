import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Seller } from '../../entities/seller.entity';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { SellerService } from '../user/user.service';

@Injectable()
export class AuthService {

    constructor(private wrapperService: WrapperService, private sellerService: SellerService) { }

    async login(data: Seller) {
        try {
            // Find user if exists
            const user = await this.wrapperService.toPromise(
                this.wrapperService.findOne(Seller, { email: data.email })
            );

            if (!user) {
                throw new NotFoundException('User doesnt exists')
            }

            // Validate password
            const validatePassword = await this.sellerService.comparePassword(
                user.password,
                data.password
            )

            if (validatePassword) {
                return user
            }

            throw new UnauthorizedException('Invalid email or password')

        } catch (error) {
            if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
                throw error;
            }

            throw new InternalServerErrorException('An unexpedted error occurred')

        }
    }
}
