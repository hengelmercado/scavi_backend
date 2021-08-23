const { Router } = require('express');
const { check, param } = require('express-validator');
const { existeEcgPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { ecgPost, ecgPut, ecgDelete, obtenerTodos, obtenerPorId, obtenerUltimo } = require('../controllers/ecg');
const { message } = require('../dictionary/dictionary');

const router = Router();

router.get('/', obtenerTodos);

router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos,
], obtenerPorId);

router.get('/:collection/:ultimo',[
    check('ultimo', 'Ultimo requerido (true)').not().isEmpty(),
    check('collection', 'collection requerido.').not().isEmpty(),
    validarCampos
], obtenerUltimo);

router.post('/', [
    validarCampos,
], ecgPost);

router.put('/:collection/:id', [
    check('collection', 'Colección requerida').not().isEmpty(),
    check('id', message.id_no_valid).isMongoId(),
    //check(['collection', 'id']).custom(existeEcgPorId),
    validarCampos,
], ecgPut);

router.delete('/:collection/:id', [
    check('collection', 'Colección requerida').not().isEmpty(),
    check('id', message.id_no_valid).isMongoId(),
    //check('id').custom(existeEcgPorId),
    validarCampos,
], ecgDelete);


module.exports = router;