const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const { postVender } = require('../controllers/vender.controller');

router.route('/vender')
    .post(postVender);

module.exports = router;