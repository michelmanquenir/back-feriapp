const Usuario = require('../models/Usuario');
const logger = require('../utils/logger')('UsuariosController');
const usuarioCtrl = {};
const bcrypt = require('bcrypt-nodejs');
let jwt = require('../helpers/jwt');

usuarioCtrl.getUsuarios = async (req, res) =>{
  try{
    logger.debug("[getUsuarios] Comienzo servicio para obtener todos los  usuarios");
    const usuarios = await Usuario.find();

    if(usuarios.length >= 1){
      logger.debug("[getUsuarios] Usuarios obtenidos: %O", usuarios);
      res.json({
        error: '0',
        message: 'Usuarios obtenidos con exito',
        usuarios: usuarios
      });
    } else {
      logger.debug("[getUsuarios] No se obtuvieron usuarios: %O", usuarios);

      res.json({
        error: '0',
        message: 'No se encontraron usuarios',
        usuarios: usuarios
      });
    }
  } catch (e){
    logger.error("[getUsuarios] Error al obtener usuarios: %O", e.message);
    res.json({
        error: '1',
        message: 'Error: ' + e.message
    });
  }
}

usuarioCtrl.registroUsuario = async (req, res) =>{
  try{
    logger.debug("[registroUsuario] Comienzo servicio para crear usuario");
    const data = req.body;
    let usuario_arr = [];
    usuario_arr = await Usuario.find({
      email: data.email
    });

    if(usuario_arr.length == 0){
      logger.debug("[registroUsuario] Comienza proceso de guardado");
      if(data.password){
        logger.debug("[registroUsuario] Comienzo encriptado password");
        bcrypt.hash(data.password, null, null, async function(err, hash){
          if( hash ){
            logger.debug("[registroUsuario] Password enctriptada");
            data.password = hash;
            try{
              const registro = await Usuario.create(data);
              logger.debug("[registroUsuario] Usuario creado con exito");
              res.json({
                error: 'o',
                message: 'Usuario registrado con exito',
                usuario: registro
              });
            } catch (e){
              logger.error("[registroUsuario] Error al crear usuario: %O", e.message);
              res.json({
                  error: '1',
                  message: 'Error: ' + e.message
              });
            }
          } else {
            logger.debug("[registroUsuario] Error al encriptar password");
            res.json({
              error: '1',
              message: 'Error server'
            });
          }
        });
      } else {
        logger.debug("[registroUsuario] No viene password");
        res.json({
          error: '1',
          message: 'Porfavor ingresar una contraseña'
        });
      }
    } else {
      logger.debug("[registroUsuario] El email ya esta asociado a otra cuenta: %O");
      res.json({
        error: '1',
        message: 'El email ya esta asociado a otra cuenta'
      });
    }
  } catch (e){
    logger.error("[registroUsuario] Error al crear usuario: %O", e.message);
    res.json({
        error: '1',
        message: 'Error: ' + e.message
    });
  }


}

usuarioCtrl.loginUsuario = async (req, res) =>{
  try{
    logger.debug("[loginUsuario] Comienzo servicio login de usuario");

    const data = req.body;
    let cliente_arr = [];
    cliente_arr = await Usuario.find({
      email: data.email
    });

    if(cliente_arr.length == 0){
      logger.debug("[loginUsuario] Email no encontrado en base de datos");
      res.json({
        error: '1',
        message: 'Email o password incorrecto'
      });
    } else {
      logger.debug("[loginUsuario] Email encontrado en base de datos");
      let usuario = cliente_arr[0];
      bcrypt.compare(data.password, usuario.password, async function(error, check){
        if(check){
          logger.debug("[loginUsuario] Password correcta");
          res.json({
            error: '1',
            message: 'Usuario logeado',
            usuario: usuario,
            token: jwt.createToken(usuario)
          });
        } else {
          logger.debug("[loginUsuario] Password incorrecta");
          res.json({
            error: '1',
            message: 'Password incorrecta'
          });
        }
      })
    }
  } catch (e){
    logger.error("[loginUsuario] Error en el login del usuario: %O", e.message);
    res.json({
        error: '1',
        message: 'Error:'+ e.message
    });
  }

}
module.exports = usuarioCtrl;