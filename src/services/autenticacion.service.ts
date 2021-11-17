import { UsuarioRepository } from './../repositories/usuario.repository';
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
    public usuarioRepository : UsuarioRepository
  ) {}

  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave = generador(8, false); //8, es la longitud de la clave
                                     // false, es la intensidad de la clave para memorizar
    return clave;
  }

  CifrarClave(clave: string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
  IdentificarPersona(usuario: string, clave: string){
    try{
     let p =this.usuarioRepository.findOne({where: {correo: usuario, clave: clave}});
     if(p){
       return p;
     } return false;
    }catch{
    return false;
    }
  }

  GenerarTokenJWT(usuario: Usuario){
    let token = jwt.sing({
      data:{
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombres +" "+ usuario.apellidos
      }
    },
    Llaves.claveJWT);
    return token;
  }
  ValidarTokenJWT(token: string){
    try{
      let datos= jwt.verify(token, Llaves.claveJWT);
      return datos;
    }catch{
      return false;

    }
  }
}
