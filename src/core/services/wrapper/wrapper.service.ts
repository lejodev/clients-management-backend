import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { EntityManager, EntityTarget } from 'typeorm';

@Injectable()
export class WrapperService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  findAll<T>(entityClass: EntityTarget<T>): Observable<T[]> {
    return from(this.entityManager.find(entityClass));
  }
}
