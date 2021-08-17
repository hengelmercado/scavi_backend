const { Router } = require('express');
const { check } = require('express-validator');
const { existetemperaturaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { temperaturaGet, temperaturaPost, temperaturaPut, temperaturaDelete, obtenertemperatura } = require('../controllers/temperatura');
const { message } = require('../dictionary/dictionary');

const router = Router();

router.get('/', temperaturaGet);

router.get('/:id', [
    validarCampos,
], obtenertemperatura);

router.post('/', [
    validarCampos,
], temperaturaPost);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existetemperaturaPorId),
    validarCampos,
], temperaturaPut);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existetemperaturaPorId),
    validarCampos,
], temperaturaDelete);


module.exports = router;