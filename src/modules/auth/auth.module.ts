import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { EmployeeController } from './controllers/user/user.controller';
import { AuthService } from './services/auth/auth.service';
import { EmployeeService } from './services/user/user.service';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtHelper, JwtService } from './services/jwt/jwt.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    JwtModule.register({
      secret: "temporaryJWTSECRET",
      signOptions: {
        expiresIn: "1day"
      }
    })
  ],
  controllers: [
    AuthController,
    EmployeeController],
  providers: [
    AuthService,
    WrapperService,
    EmployeeService,
    JwtService,
    JwtHelper
  ],
  exports: [JwtService]
})
export class AuthModule { }
