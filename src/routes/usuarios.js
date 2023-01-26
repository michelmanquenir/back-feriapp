const {Router} = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const { getUsuarios } = require('../controllers/usuarios.controller');


module.exports = router;