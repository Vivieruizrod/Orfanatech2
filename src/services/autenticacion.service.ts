import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Null, repository} from '@loopback/repository';
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

  async identificarUsuario(usuario:string, clave:string){
    try {
/*

      console.log(c)
      if (c){
        return c;
      }

      let a = this.administradorRepository.findOne({where:{correo:usuario, clave:clave}});
      console.log(a)
      if(a){
        return a;
      }
*/
      let u= null;
      let comparar = null;
      let sw = true;
      let i = 1;
      while (sw){
        if(i==1 && u==comparar){
          u = this.clienteRepository.findOne({where:{correo:usuario, clave:clave}});
          if(await u){
          }else{
            comparar=u;
          }
        }else if(i==2 && u==comparar){
          u = this.administradorRepository.findOne({where:{correo:usuario, clave:clave}});
          if(await u){
          }else{
            comparar=u;
          }
        }else if (i==3 && u==comparar){
          u = this.asesorRepository.findOne({where:{correo:usuario, clave:clave}});
          if(await u){
          }else{
            comparar=u;
          }
        }
        console.log(typeof u);

        if(i==3){
          sw=false;
        }
        i++;
      }

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
