const {Router} = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const { getVentas } = require('../controllers/ventas.controller');

router.route('/').get(getVentas);

module.exports = router;