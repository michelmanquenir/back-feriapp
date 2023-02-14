const Usuario = require('../models/Usuario');
const logger = require('../utils/logger')('UsuariosController');
const usuarioCtrl = {};

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


module.exports = usuarioCtrl;