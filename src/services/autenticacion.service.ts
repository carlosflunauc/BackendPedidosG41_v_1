import { UsuarioRepository } from './../repositories';
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Usuario } from '../models';
import { Llaves } from '../config/llaves';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepositorio: UsuarioRepository
  ) {}

  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave = generador(8, false); // tamaño de clave; complejidad de recordacion
    return clave;
  }

  CifrarClave(clave: string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarUsuario(usuario: string, clave: string)
  {
    try{
      let p = this.usuarioRepositorio.findOne({where: {correo: usuario, clave: clave}});
      if(p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(usuario: Usuario)
  {
    let token = jwt.sign({
      data:{
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombres +" "+ usuario.apellidos
      }
    },
    Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string)
  {
    try{
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch{
      return false;
    }

  }

}
