import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Asesor} from './asesor.model';
import {Vehiculo} from './vehiculo.model';
import {CoDeudor} from './co-deudor.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasOne(() => Vehiculo)
  vehiculo: Vehiculo;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  @hasOne(() => CoDeudor)
  coDeudor: CoDeudor;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
