import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Seller } from '../../entities/seller.entity';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { SellerService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private wrapperService: WrapperService,
        private sellerService: SellerService,
        private jwtService: JwtService) { }

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

            // JWT payload

            const payload = {email: user.email, sub: user.id, role: user.role.id}
            
            if (validatePassword) {
                return this.jwtService.sign(payload)
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
