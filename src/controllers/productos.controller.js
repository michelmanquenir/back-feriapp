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


productoCtrl.crearProducto = async (req, res) => {
  try {
      logger.debug("[crearProducto] Inicio servicio crear producto");
      const { nombre, rut_empresa, codigo, precio_compra, precio_venta, en_stock, stock, img } = req.body;
      logger.debug("[crearProducto] Se obtiene parametro de request");
      logger.debug("[crearProducto] --> nombre: %O", nombre);
      logger.debug("[crearProducto] --> rut_empresa: %O", rut_empresa);
      logger.debug("[crearProducto] --> codigo: %O", codigo);
      logger.debug("[crearProducto] --> precio_compra: %O", precio_compra);
      logger.debug("[crearProducto] --> precio_venta: %O", precio_venta);
      logger.debug("[crearProducto] --> en_stock: %O", en_stock);
      logger.debug("[crearProducto] --> stock: %O", stock);
      logger.debug("[crearProducto] --> img: %O", img);
      const productos = await Producto.find({
          rut_empresa: rut_empresa,
          codigo: codigo
      });
      if(productos != null && productos !=0){
          logger.debug("[crearProducto] el codigo ya existe en esta empresa");
          res.json({
              error: '2',
              message: 'El codigo ya existe en esta empresa'
          });
          return;
      }else{
          logger.debug("[crearProducto] Codigo Valido Comenzamos con el proceso de almacenado de producto");
          logger.debug("[crearProducto] Se comienza a armar objeto newProducto");

          const newProducto = new Producto({
            nombre:nombre,
            rut_empresa: rut_empresa,
            codigo: codigo,
            precio_compra: precio_compra,
            precio_venta: precio_venta,
            en_stock: en_stock,
            stock: stock,
            img: img
          });
          await newProducto.save();
          logger.debug("[crearProducto] Producto guardado con exito");
          res.json({
              error: '0',
              message: 'Producto creado con exito'
          });
      }
  } catch (e) {
      logger.error("[crearProducto] Error al crear el Producto: %O", e.message);
      res.json({
          error: '1',
          message: 'Error: ' + e.message
      });
  }
};

productoCtrl.updateProducto = async (req, res) => {
  try {
      logger.debug("[updateProducto] Inicio servicio actualizar producto");
      const { id } = req.params;
      const { nombre, rut_empresa, codigo, precio_compra, precio_venta, en_stock, stock, img } = req.body;
      logger.debug("[crearProducto] Se obtiene parametro de request");
      logger.debug("[crearProducto] --> nombre: %O", nombre);
      logger.debug("[crearProducto] --> rut_empresa: %O", rut_empresa);
      logger.debug("[crearProducto] --> codigo: %O", codigo);
      logger.debug("[crearProducto] --> precio_compra: %O", precio_compra);
      logger.debug("[crearProducto] --> precio_venta: %O", precio_venta);
      logger.debug("[crearProducto] --> en_stock: %O", en_stock);
      logger.debug("[crearProducto] --> stock: %O", stock);
      logger.debug("[crearProducto] --> img: %O", img);
      logger.debug("[updateProducto] Comienza actualizacion");
      await Producto.findOneAndUpdate({ _id: id }, {
        nombre:nombre,
        rut_empresa: rut_empresa,
        codigo: codigo,
        precio_compra: precio_compra,
        precio_venta: precio_venta,
        en_stock: en_stock,
        stock: stock,
        img: img
      });
      logger.debug("[updateProducto] Producto actualizado con exito");
      res.json({
          error: '0',
          message: 'Producto actualizado con exito'
      });
  } catch (e) {
      logger.error("[updateProducto] Error al actualizar producto");
      res.json({
          error: '1',
          message: 'Error al actualizar producto: ' + e.message
      });
  }
};

productoCtrl.deleteProducto = async (req, res) => {
  try {
      logger.debug("[deleteProducto] Inicio servicio eliminar producto");
      const { id } = req.params;
      logger.debug("[deleteProducto] Obtenemos id producto a eliminar: " + id);
      await Producto.findOneAndUpdate({ _id: id }, {
          estado: 0
      });
      logger.debug("[deleteProducto] Producto eliminado correctamente: " + id);
      res.json({
          error: '0',
          message: 'Producto eliminado de manera correcta'
      });
  } catch (e) {
      logger.error("[deleteProducto] Error al eliminar producto" + id);
      res.json({
          error: '1',
          message: 'Error al eliminar producto: ' + e.message
      });
  }
};

module.exports = productoCtrl;