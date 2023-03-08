const {Router} = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const { getVentas, vender } = require('../controllers/ventas.controller');

router.route('/').get(getVentas);
router.route('/vender').post(vender);

module.exports = router;