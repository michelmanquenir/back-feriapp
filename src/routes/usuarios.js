const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const {
    getUsuarios,
    registroUsuario,
    loginUsuario
} = require('../controllers/usuarios.controller');


router.route('/registro').post(registroUsuario);
router.route('/login').post(loginUsuario);

router.route('/').get(getUsuarios);

module.exports = router;