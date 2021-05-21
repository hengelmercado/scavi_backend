const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { cargoGet, cargoPost, cargoPut, cargoDelete } = require('../controllers/cargo');

const router = Router();

router.get('/', cargoGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'El tamaño maximo es de 100 caracteres').isLength(100),
    validarCampos,
], cargoPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], cargoPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], cargoDelete);


module.exports = router;