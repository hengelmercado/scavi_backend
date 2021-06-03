const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { message } = require('../dictionary/dictionary');
const { obtenerTerceros, obtenerTercero, ActualizarTercer, borrarTercer, crearTercer } = require('../controllers/terceros');
const { existeTerceroPorId, existeTipoDocumentoPorId, existeDireccionPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerTerceros);

router.get('/:id', [
    check('id', message.id_no_valid),
    check('id').custom(existeTerceroPorId),
    validarCampos,
], obtenerTercero);

router.post('/', [
    check('tipoDocumento', message.id_no_valid).isMongoId(),
    check('tipoDocumento').custom(existeTipoDocumentoPorId),
    check('direccion', message.id_no_valid).isMongoId(),
    check('direccion').custom(existeDireccionPorId),
    check('numeroDocumento', message.num_identificacion_req).not().isEmpty(),
    check('razonSocial', message.razon_soci_req).not().isEmpty(),
    check('personaContacto', message.persona_cont_req).not().isEmpty(),
    check('telefono', message.persona_cont_req).not().isEmpty(),
    check('email', message.correo_req).not().isEmpty(),
    validarCampos,
], crearTercer);

router.put('/:id', [
    check('id', message.id_no_valid),
    check('id').custom(existeTerceroPorId),
    validarCampos,
], ActualizarTercer);

router.delete('/:id', [
    check('id', message.id_no_valid),
    check('id').custom(existeTerceroPorId),
    validarCampos,
], borrarTercer);



module.exports = router;