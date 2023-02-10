const {Router} = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const { getProductos, crearProducto, updateProducto, deleteProducto } = require('../controllers/productos.controller');

router.route('/').get(getProductos);

router.route('/crearProducto').post(crearProducto);

router.route('/:id')
   //.get(getProductoById)
   .put(updateProducto)
   .delete(deleteProducto);
module.exports = router;