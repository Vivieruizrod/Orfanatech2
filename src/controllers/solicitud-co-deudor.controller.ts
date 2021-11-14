import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Solicitud,
  CoDeudor,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudCoDeudorController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/co-deudor', {
    responses: {
      '200': {
        description: 'Solicitud has one CoDeudor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CoDeudor),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CoDeudor>,
  ): Promise<CoDeudor> {
    return this.solicitudRepository.coDeudor(id).get(filter);
  }

  @post('/solicituds/{id}/co-deudor', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(CoDeudor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CoDeudor, {
            title: 'NewCoDeudorInSolicitud',
            exclude: ['id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) coDeudor: Omit<CoDeudor, 'id'>,
  ): Promise<CoDeudor> {
    return this.solicitudRepository.coDeudor(id).create(coDeudor);
  }

  @patch('/solicituds/{id}/co-deudor', {
    responses: {
      '200': {
        description: 'Solicitud.CoDeudor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CoDeudor, {partial: true}),
        },
      },
    })
    coDeudor: Partial<CoDeudor>,
    @param.query.object('where', getWhereSchemaFor(CoDeudor)) where?: Where<CoDeudor>,
  ): Promise<Count> {
    return this.solicitudRepository.coDeudor(id).patch(coDeudor, where);
  }

  @del('/solicituds/{id}/co-deudor', {
    responses: {
      '200': {
        description: 'Solicitud.CoDeudor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CoDeudor)) where?: Where<CoDeudor>,
  ): Promise<Count> {
    return this.solicitudRepository.coDeudor(id).delete(where);
  }
}
