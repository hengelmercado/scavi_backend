const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeDireccionPorId, existePaisPorId, existeDepartamentoPorId, existeCiudadPorId } = require('../helpers/db-validators');
const { message } = require('../dictionary/dictionary');
const { obtenerDirecciones, obtenerDireccion, crearDireccion, actualizarDireccion, borrarDirecciones } = require('../controllers/direccion');


const router = Router();

router.get('/', obtenerDirecciones);

router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeDireccionPorId),
    validarCampos,
], obtenerDireccion);

router.post('/', [
    check('direccion', message.dir_req).not().isEmpty(),
    check('pais', message.id_no_valid).isMongoId(),
    check('pais').custom(existePaisPorId),
    check('departamento', message.id_no_valid).isMongoId(),
    check('departamento').custom(existeDepartamentoPorId),
    check('ciudad', message.id_no_valid).isMongoId(),
    check('ciudad').custom(existeCiudadPorId),
    validarCampos
], crearDireccion);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeDireccionPorId),
    validarCampos,
], actualizarDireccion);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeDireccionPorId),
    validarCampos,
], borrarDirecciones);

module.exports = router;