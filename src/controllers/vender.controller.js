const Vender = require('../models/Vender');
const logger = require('../utils/logger')('venderController');
const venderCtrl = {};

venderCtrl.postVender = async (req, res) =>{
  try{
    console.log('vender');
  } catch (e){
    logger.error("[postVender] Error al realizar venta: %O", e.message);
    res.json({
        error: '1',
        message: 'Error: ' + e.message
    });
  }
}


module.exports = venderCtrl;