const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { message } = require('../dictionary/dictionary');
const { obtenerTipoInstrumentos, obtenerTipoInstrumento, crearTipoInstrumento, actualizarTipoInstrumento, borrarTipoInstrumento } = require('../controllers/tipoInstrumento');
const { existeTipoInstrumentoPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerTipoInstrumentos);

router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeTipoInstrumentoPorId),
    validarCampos,
], obtenerTipoInstrumento);

router.post('/', [
    check('nombre', message.nombre_req).not().isEmpty(),
    validarCampos,
], crearTipoInstrumento);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeTipoInstrumentoPorId),
    validarCampos,
], actualizarTipoInstrumento);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeTipoInstrumentoPorId),
    validarCampos,
], borrarTipoInstrumento);


module.exports = router;