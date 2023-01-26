const {Router} = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const { getUsuarios } = require('../controllers/usuarios.controller');

router.route('/')
    .get(getUsuarios);

module.exports = router;