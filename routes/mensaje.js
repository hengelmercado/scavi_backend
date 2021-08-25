const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { obtenerTodos, crearRegistro } = require('../controllers/mensaje');

const router = Router();

router.get('/', obtenerTodos);

/* router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos,
], obtenerPorId);*/

router.post('/', [
    validarCampos,
], crearRegistro);
/*
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
], ecgDelete); */


module.exports = router;