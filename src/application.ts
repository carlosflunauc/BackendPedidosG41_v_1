import { EstrategiaAdministrador } from './strategies/admin.strategy';
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
import {authentication, AuthenticationComponent} from '@loopback/authentication';
import {AuthenticationComponent} from '@loopback/authentication';

//import {ÁuthenticationComponent} from ''

export {ApplicationConfig};

export class App extends BootMixin(
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
this.component(AuthenticationComponent);
  }
}
function AuthenticationComponent(AuthenticationComponent: any) {
  throw new Error('Function not implemented.');
}

function registerAuthenticationStrategy(arg0: this, EstrategiaAdministrador: typeof EstrategiaAdministrador) {
  throw new Error('Function not implemented.');
}

