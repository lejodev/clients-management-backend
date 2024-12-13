import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Employee } from '../../entities/employee.entity';
import { Observable } from 'rxjs';
import { FindOptionsWhere } from 'typeorm';
import * as bcrypt from "bcrypt"
@Injectable()
export class EmployeeService {
    constructor(private wrapperService: WrapperService) { }

    saltRounds: number = 10;

    async create(createEmployee: Employee): Promise<Employee> {
        try {
            createEmployee.password = this.hashSyncPassword(createEmployee.password)
            console.log(createEmployee);

            const create = await this.wrapperService.toPromise(
                this.wrapperService.create(Employee, createEmployee),
            );
            return create;
        } catch (error) {
            throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
        }
    }

    findAll() {
        console.log("service");

        return this.wrapperService.findAll(Employee);
    }

    // Gets by FindOptionsWhere condition
    findBy(condition: FindOptionsWhere<Employee>) {
        return this.wrapperService.findOne(Employee, condition)
    }

    async findOne(id: number): Promise<Employee | string> {
        const user = await this.wrapperService.toPromise(
            this.wrapperService.findOne(Employee, { id }),
        );
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    update(id: number, updateEmployee: Employee) {
        return this.wrapperService.update(Employee, id, updateEmployee);
    }

    remove(id: string) {
        return this.wrapperService.delete(Employee, id);
    }

    hashSyncPassword(password: string) {
        return bcrypt.hashSync(password, this.saltRounds)
    }

    async comparePassword(hashedPassword: string, inputPassword: string) {
        return await bcrypt.compare(inputPassword, hashedPassword)

    }

}
