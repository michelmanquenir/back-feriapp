const {Router} = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const { getProductos, crearProducto, updateProducto, deleteProducto } = require('../controllers/productos.controller');

router.route('/').get(getProductos);

router.route('/crearProducto').post(crearProducto);

router.route('/delete').post(deleteProducto);
router.route('/update').post(updateProducto);

module.exports = router;