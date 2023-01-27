const {Router} = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const { getProductos } = require('../controllers/productos.controller');

router.route('/')
    .get(getProductos);

module.exports = router;