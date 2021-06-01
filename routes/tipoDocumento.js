const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeTipoDocumentoPorId } = require('../helpers/db-validators');
const { obtenerTipoDocumentos, obtenerTipoDocumento, crearTipoDocumento, actualizarTipoDocumento, borrarTipoDocumento } = require('../controllers/tipoDocumento');
const { message } = require('../dictionary/dictionary');


const router = Router();

router.get('/', obtenerTipoDocumentos);

router.get('/:id', [
    check('id', message.id_no_valid),
    check('id').custom(existeTipoDocumentoPorId),
    validarCampos,
], obtenerTipoDocumento);

router.post('/', [
    check('nombre', message.nombre_req).not().isEmpty(),
    check('siglas', message.siglas_req).not().isEmpty(),
    validarCampos,
], crearTipoDocumento);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos,
], actualizarTipoDocumento);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos,
], borrarTipoDocumento);


module.exports = router;