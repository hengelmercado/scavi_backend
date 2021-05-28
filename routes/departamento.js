const { Router } = require('express');
const { check } = require('express-validator');
const { existePaisPorId, existeDepartamentoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { message } = require('../dictionary/dictionary');
const { obtenerDepartamentos, crearDepartamento, actualizarDepartamento, obtenerDepartamento, borrarDepartamento } = require('../controllers/departamento');

const router = Router();

router.get('/', obtenerDepartamentos);

router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeDepartamentoPorId),
    validarCampos,
], obtenerDepartamento);

router.post('/', [
    check('nombre', message.nombre_req).not().isEmpty(),
    check('pais', message.id_no_valid).isMongoId(),
    check('pais').custom(existePaisPorId),
    validarCampos,
], crearDepartamento);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeDepartamentoPorId),
    validarCampos,
], actualizarDepartamento);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeDepartamentoPorId),
    validarCampos,
], borrarDepartamento);


module.exports = router;