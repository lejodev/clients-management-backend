import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Employee } from '../../entities/employee.entity';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() employee: Employee) {
        return this.authService.login(employee)
    }
}
