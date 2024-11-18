import { Body, Controller, Post } from '@nestjs/common';
import { Seller } from '../../entities/seller.entity';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('login')
    login(@Body() employee: Seller) {
        return this.authService.login(employee)
    }
}
