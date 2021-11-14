import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Solicitud} from './solicitud.model';

@model()
export class Vehiculo extends Entity {
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
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  tipoOferta: number;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  porcentajeCompra: number;

  @property({
    type: 'string',
  })
  video?: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  @property({
    type: 'string',
  })
  solicitudId?: string;

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
