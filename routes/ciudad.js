const { Router } = require('express');
const { check } = require('express-validator');
const { existeCiudadPorId, existeDepartamentoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { message } = require('../dictionary/dictionary');
const { crearCiudad, obtenerCiudades, obtenerCiudad, actualizarCiudad, borrarCiudad } = require('../controllers/ciudad');


const router = Router();

router.get('/', obtenerCiudades);

router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeCiudadPorId),
    validarCampos,
], obtenerCiudad);

router.post('/', [
    check('nombre', message.nombre_req),
    check('departamento', message.id_no_valid).isMongoId(),
    check('departamento').custom(existeDepartamentoPorId),
    validarCampos,
], crearCiudad);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeCiudadPorId),
    validarCampos,
], actualizarCiudad);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeCiudadPorId),
    validarCampos,
], borrarCiudad);

module.exports = router;