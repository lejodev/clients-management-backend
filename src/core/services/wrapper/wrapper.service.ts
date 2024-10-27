import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Observable, firstValueFrom, from } from 'rxjs';
import { DeleteResult, EntityManager, EntityTarget, FindOptionsWhere, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class WrapperService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  toPromise<T>(observable: Observable<T>): Promise<T> {
    return firstValueFrom(observable)
  }

  create<T>(entity: EntityTarget<T>, data: T): Observable<T> {
    return from(this.entityManager.save(entity, data));
  }

  findAll<T>(entityClass: EntityTarget<T>): Observable<T[]> {
    return from(this.entityManager.find(entityClass));
  }

  findOne<T>(entityTarget: EntityTarget<T>, where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Observable<T> {
    return from(this.entityManager.findOneBy(entityTarget, where));
  }

  update<T>(entityTarget: EntityTarget<T>, conditions: any, data: QueryDeepPartialEntity<T>): Observable<UpdateResult> {
    return from(this.entityManager.update(entityTarget, conditions, data))
  }

  delete<T>(entityTarget: EntityTarget<T>, id: string):Observable<DeleteResult>{
    return from( this.entityManager.delete(entityTarget,id))
  }

  query<T>(query: string, params: string[]): Observable<T> {
    return from(this.entityManager.query(query, params))
  }

}
