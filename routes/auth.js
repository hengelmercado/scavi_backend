const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'a contraseña es obligatoria').not().isEmpty(),
    validarCampos,
], login);

router.post('/google', [
    check('id_token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos,
], googleSignIn);


module.exports = router;