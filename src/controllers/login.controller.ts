import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  RequestBodyParser,
  HttpErrors,
} from '@loopback/rest';
import {Cliente, Administrador, Asesor, Credenciales} from '../models';
import {ClienteRepository,AdministradorRepository,AsesorRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch =  require('node-fetch');


export class LoginController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @repository(AdministradorRepository)
    public administradorRepository : AdministradorRepository,
    @repository(AsesorRepository)
    public asesorRepository : AsesorRepository,
    @service(AutenticacionService)
    public autenticacion: AutenticacionService,
  ) {}

  @post('/identificarPersona',{
    responses:{
      '200':{
        description: 'Identificar Usuarios'
      }
    }
  })
  async identificarpersona(
     @requestBody() credenciales: Credenciales
  ){
    let u = await this.autenticacion.identificarUsuario(credenciales.usuario, credenciales.clave);
    let tipo= await this.autenticacion.identificarTipoUsuario(credenciales.usuario, credenciales.clave);
    if(u){
      let token = this.autenticacion.generarTokenJWT(u,tipo.toString());

      return {
        dat:{
          nombre:u.nombre,
          apellido: u.apellido,
          id:u.id,
          correo:u.correo,
          clave:u.clave,
          tipo: tipo
        },
        token:token
      }
    }else{
      throw new HttpErrors[401]("Datos incorrectos");
    }
  }
}
