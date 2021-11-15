import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
GenerarClave(){
  let clave = generador(8, false); // 8 longitud, false intensidad de memorizar
  return clave;
}

CifrarClave(clave: string){
  let claveCifrada = cryptoJS.MD5(clave).toString();
  return claveCifrada;
}

}
