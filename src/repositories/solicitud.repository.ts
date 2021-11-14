import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Cliente, Asesor, Vehiculo, CoDeudor} from '../models';
import {ClienteRepository} from './cliente.repository';
import {AsesorRepository} from './asesor.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {CoDeudorRepository} from './co-deudor.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {


  public readonly asesor: BelongsToAccessor<Asesor, typeof Solicitud.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Solicitud.prototype.id>;

  public readonly vehiculo: HasOneRepositoryFactory<Vehiculo, typeof Solicitud.prototype.id>;

  public readonly coDeudor: HasOneRepositoryFactory<CoDeudor, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('CoDeudorRepository') protected coDeudorRepositoryGetter: Getter<CoDeudorRepository>,
  ) {
    super(Solicitud, dataSource);
    this.coDeudor = this.createHasOneRepositoryFactoryFor('coDeudor', coDeudorRepositoryGetter);
    this.registerInclusionResolver('coDeudor', this.coDeudor.inclusionResolver);
    this.vehiculo = this.createHasOneRepositoryFactoryFor('vehiculo', vehiculoRepositoryGetter);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
  }
}
