import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Asesor, Solicitud} from '../models';
import {AsesorRepository} from './asesor.repository';
import {SolicitudRepository} from './solicitud.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly asesor: BelongsToAccessor<Asesor, typeof Vehiculo.prototype.id>;

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
  }
}
