const { Router } = require('express');
const { check } = require('express-validator');
const { existeTipoDocumentoPorId, existePersonaPorId, existeDireccionPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { message } = require('../dictionary/dictionary');
const { obtenerPersonas, obtenerPersona, crearPersona, actualizarPersona, borrarPersona, obtenerPersonaEmail
 } = require('../controllers/persona');

const router = Router();

router.get('/', obtenerPersonas);

router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existePersonaPorId),
    validarCampos,
], obtenerPersona);

router.post('/email', [
    validarCampos,
], obtenerPersonaEmail);

router.post('/', [
    check('tipo_identificacion', message.id_no_valid).isMongoId(),
    check('tipo_identificacion').custom(existeTipoDocumentoPorId),
    check('direccion', message.id_no_valid).isMongoId(),
    check('direccion').custom(existeDireccionPorId),
    check('primer_nombre', message.prim_nombre_req).not().isEmpty(),
    check('segundo_nombre', message.seg_nombre_req).not().isEmpty(),
    check('primer_apellido', message.prim_apellido_req).not().isEmpty(),
    check('segundo_apellido', message.seg_apellido_req).not().isEmpty(),
    check('numero_identificacion', message.num_identificacion_req).not().isEmpty(),
    check('correo', message.correo_req).not().isEmpty(),
    check('telefono', message.telefono_req).not().isEmpty(),
    check('sexo', message.sexo_req).not().isEmpty(),
    check('fecha_de_nacimiento', message.fecha_naci_req).not().isEmpty(),
    validarCampos,
], crearPersona);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existePersonaPorId),
    validarCampos,
], actualizarPersona);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existePersonaPorId),
    validarCampos,
], borrarPersona);


module.exports = router;