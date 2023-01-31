const Venta = require('../models/Venta');
const logger = require('../utils/logger')('VentaController');
const ventaCtrl = {};

ventaCtrl.getVentas = async (req, res) =>{
  try {
    logger.debug("[getVentas] Comienzo servicio para obtener todos los ventas");
    const ventas = await Venta.find();

    if(ventas.length >= 1){
      logger.debug("[getVentas] Ventas obtenidos: %O", ventas);
      res.json({
        error: '0',
        message: 'Ventas obtenidos con exito',
        ventas: ventas
      });
    } else {
      logger.debug("[getVentas] No se obtuvieron ventas: %O", ventas);

      res.json({
        error: '0',
        message: 'No se encontraron ventas',
        ventas: ventas
      });
    }
  } catch (e){
    logger.error("[getVentas] Error al obtener ventas: %O", e.message);
    res.json({
        error: '1',
        message: 'Error: ' + e.message
    });
  }
}


module.exports = ventaCtrl;