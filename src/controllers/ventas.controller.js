const { findById } = require('../models/Venta');
const Venta = require('../models/Venta');
const Producto = require('../models/Producto');
const logger = require('../utils/logger')('VentasController');
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

ventaCtrl.vender = async (req, res) => {
  try {
    logger.debug("[vender] Comienzo servicio para realizar la venta");

    const { usuario, productos, rut_empresa, total_ganancia, total_venta, metodo_pago} = req.body;
      logger.debug("[vender] Se obtiene parametro de request");
      logger.debug("[vender] --> usuario: %O", usuario);
      logger.debug("[vender] --> productos: %O", productos);
      logger.debug("[vender] --> rut_empresa: %O", rut_empresa);
      logger.debug("[vender] --> total_ganancia: %O", total_ganancia);
      logger.debug("[vender] --> total_venta: %O", total_venta);
      logger.debug("[vender] --> metodo_pago: %O", metodo_pago);
      let nuevoStock = 0;
      let countProductos = 0;
      //validar que los productos en stock sean menores que la venta
      logger.debug("[vender] Comenzamos con el proceso de venta");
      countProductos = productos.length;

      logger.debug("[vender] Comenzamos descuento de stock");
      for(let i = 0; i < countProductos; i++){
        let idProducto = productos[i].id_producto;
        let productoBD = await Producto.findById(idProducto);
        nuevoStock = productoBD.stock - productos[i].cantidad;
        await Producto.findOneAndUpdate({ _id: idProducto }, {
          stock: nuevoStock
        });
      }

      logger.debug("[vender] Comenzamos guardado de venta");
      const newVenta = new Venta({
        usuario: usuario,
        productos: productos,
        rut_empresa: rut_empresa,
        total_ganancia: total_ganancia,
        total_venta: total_venta,
        metodo_pago: metodo_pago,
      });

      await newVenta.save();
      logger.debug("[vender] Venta creada con exito");

  } catch (e) {
    logger.error("[vender] Error al realizar la venta: %O", e.message);
    res.json({
        error: '1',
        message: 'Error: ' + e.message
    });
  }
}


module.exports = ventaCtrl;