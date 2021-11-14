import {Entity, model, property} from '@loopback/repository';

@model()
export class CoDeudor extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoDocumento: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
  })
  solicitudId?: string;

  constructor(data?: Partial<CoDeudor>) {
    super(data);
  }
}

export interface CoDeudorRelations {
  // describe navigational properties here
}

export type CoDeudorWithRelations = CoDeudor & CoDeudorRelations;
