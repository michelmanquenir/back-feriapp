const Producto = require('../models/Producto');
const logger = require('../utils/logger')('ProductoController');
const productoCtrl = {};

productoCtrl.getProductos = async (req, res) =>{
  try {
    logger.debug("[getProductos] Comienzo servicio para obtener todos los productos");
    const productos = await Producto.find();

    if(productos.length >= 1){ 
      logger.debug("[getProductos] Productos obtenidos: %O", productos);
      res.json({
        error: '0',
        message: 'Productos obtenidos con exito',
        productos: productos
      });
    } else {
      logger.debug("[getProductos] No se obtuvieron productos: %O", productos);

      res.json({
        error: '0',
        message: 'No se encontraron productos',
        productos: productos
      });
    }
  } catch (e){
    logger.error("[getProductos] Error al obtener productos: %O", e.message);
    res.json({
        error: '1',
        message: 'Error: ' + e.message
    });
  }
}


module.exports = productoCtrl;