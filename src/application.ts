import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {EstrategiaAdministrador} from './strategies/Adminitrador.strategy';
import {EstrategiaCliente} from './strategies/Cliente.strategy';
import {EstrategiaAsesor} from './strategies/Asesor.strategy';
import {EstrategiaEmpleado} from './strategies/empleados.strategy';


export {ApplicationConfig};

export class Orfanatech2Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    registerAuthenticationStrategy(this, EstrategiaAdministrador);
    registerAuthenticationStrategy(this, EstrategiaCliente);
    registerAuthenticationStrategy(this, EstrategiaAsesor);
    registerAuthenticationStrategy(this, EstrategiaEmpleado) ;
    this.component(AuthenticationComponent);
  }
}
