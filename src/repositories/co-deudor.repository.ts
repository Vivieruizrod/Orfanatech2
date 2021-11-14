import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {CoDeudor, CoDeudorRelations} from '../models';

export class CoDeudorRepository extends DefaultCrudRepository<
  CoDeudor,
  typeof CoDeudor.prototype.id,
  CoDeudorRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(CoDeudor, dataSource);
  }
}
