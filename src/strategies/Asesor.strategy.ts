import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors,Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class EstrategiaAsesor implements AuthenticationStrategy{
  name: string = 'Asesor';

  constructor(
    @service (AutenticacionService)
    public autenticacionService: AutenticacionService,
  ){}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if(token){
      let datos = this.autenticacionService.Validartoken(token);
      if(datos){
        if(datos.data.tipo=="Asesor"){
          let perfil : UserProfile = Object.assign({
            nombre: datos.data.nombre,
            apellido: datos.data.apellido,
            id: datos.data.id,
            correo: datos.data.correo,
            clave: datos.data.clave,
            tipo: datos.data.tipo
          });
          return perfil;
        }
      }else{
        throw new HttpErrors [401]("Token no valido");
      }

    }else{
      throw new HttpErrors [401]("Solicitud sin token");
    }
  }

}
