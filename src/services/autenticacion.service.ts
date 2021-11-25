import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Asesor} from '../models';
import {AdministradorRepository, AsesorRepository, ClienteRepository} from '../repositories';
const generador = require ('password-generator');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository
    ) {}

  /*
   * Add service methods here
   */
  generarclave(){
    let clave = generador(10, false);
    return clave;
  }

  cifrarClave(clave:String){
    let claveCifrada = cryptojs.MD5(clave).toString();
    return claveCifrada;
  }

  identificarUsuario(usuario:string, clave:string){
    try {

      let c = this.clienteRepository.findOne({where:{correo:usuario, clave:clave}});
      console.log(c)
      if (c){
        return c;
      }

      let a = this.administradorRepository.findOne({where:{correo:usuario, clave:clave}});
      console.log(a)
      if(a){
        return a;
      }

      let u = this.asesorRepository.findOne({where:{correo:usuario, clave:clave}});
      if(u){
        return u;
      }

      return false;

    } catch (error) {
      console.log(error)
      return false

    }

  }

  generarTokenJWT(usuario:any){
    let token = jwt.sign({
      data:{
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo:usuario.correo
      }
    },
    Llaves.claveJWT)
    return token;
  }

  Validartoken(token:string){
    try {
      let dato = jwt.verify(token,Llaves.claveJWT);
      return dato;
    } catch (error) {
      return false;
    }
  }

}
