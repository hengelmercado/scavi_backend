const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeCargoPorId } = require('../helpers/db-validators');
const { obtenerCargo, obtenerCargos, actualizarCargo, crearCargo, borrarCargo } = require('../controllers/cargo');
const { message } = require('../dictionary/dictionary');

const router = Router();

router.get('/', obtenerCargos);

router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeCargoPorId),
    validarCampos,
], obtenerCargo);

router.post('/', [
    check('nombre', message.nombre_req).not().isEmpty(),
    validarCampos,
], crearCargo);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeCargoPorId),
    validarCampos,
], actualizarCargo);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeCargoPorId),
    validarCampos,
], borrarCargo);


module.exports = router;