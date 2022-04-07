const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { message } = require('../dictionary/dictionary');
const { obtenerRegistros, obtenerRegistro, actualizarRegistros, borrarRegistros, crearRegistros } = require('../controllers/registro');

const router = Router();

router.get('/', obtenerRegistros);

router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos
], obtenerRegistro);

router.post('/', [
    validarJWT,
    check('ccosto', message.ccosto_req).not().isEmpty(),
    check('ccosto', message.id_no_valid).isMongoId(),
    validarCampos
], crearRegistros);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('ccosto', message.id_no_valid).isMongoId(),
    validarCampos
], actualizarRegistros);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('ccosto', message.id_no_valid).isMongoId(),
    validarCampos
], borrarRegistros);


module.exports = router;