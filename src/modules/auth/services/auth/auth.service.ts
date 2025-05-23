import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Employee } from '../../entities/employee.entity';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { EmployeeService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private wrapperService: WrapperService,
        private employeeService: EmployeeService,
        private jwtService: JwtService) { }

    async login(data: Employee) {
        try {
            // Find user if exists
            const user = await this.wrapperService.toPromise(
                this.wrapperService.findOne(Employee, { email: data.email })
            );

            if (!user) {
                throw new NotFoundException('User doesnt exists')
            }

            // Validate password
            const validatePassword = await this.employeeService.comparePassword(
                user.password,
                data.password
            )

            // JWT payload

            console.log('***', user);
            
            const payload = { email: user.email, sub: user.id, role: user.role.name }

            if (validatePassword) {
                const token = this.jwtService.sign(payload, { secret: "temporaryJWTSECRET" });
                return { 'token': token }
            }

            throw new UnauthorizedException('Invalid email or password')

        } catch (error) {
            if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
                console.log('Possible user error: ', error.message);
                
                throw error;
            }
            console.log("error is happening here! *********", error);


            throw new InternalServerErrorException('An unexpedted error occurred')

        }
    }


}
