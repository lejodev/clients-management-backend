import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Employee } from '../../entities/employee.entity';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { AuthService } from '../../services/auth/auth.service';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('login')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiBody({
        description: 'employee login info', required: true, isArray: false, type: Employee,
        examples: {
            'example':
            {
                value:
                {
                    email: 'employee@example.com',
                    password: 'password123'
                }
            }
        }
    })
    @ApiOperation({ summary: 'Login user' })
    @Post('login')
    login(@Body() employee: Employee) {
        return this.authService.login(employee)
    }
}
