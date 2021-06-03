const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { message } = require('../dictionary/dictionary');
const { obtenerInstrumentos, obtenerInstrumento, crearInstrumento, actualizarInstrumento } = require('../controllers/instrumento');
const { existeInstrumentoPorId, existeTipoInstrumentoPorId } = require('../helpers/db-validators');
const { borrarTipoInstrumento } = require('../controllers/tipoInstrumento');

const router = Router();

router.get('/', obtenerInstrumentos);

router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeInstrumentoPorId),
    validarCampos,
], obtenerInstrumento);

router.post('/', [
    check('nombre', message.nombre_req).not().isEmpty(),
    check('serial', message.serial_req).not().isEmpty(),
    check('tipoInstrumento', message.id_no_valid).isMongoId(),
    check('tipoInstrumento').custom(existeTipoInstrumentoPorId),
    validarCampos,
], crearInstrumento);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeInstrumentoPorId),
    validarCampos,
], actualizarInstrumento);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeInstrumentoPorId),
    validarCampos,
], borrarTipoInstrumento);

module.exports = router;