const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { paisGet, paisPost, paisPut, paisDelete } = require('../controllers/pais');

const router = Router();

router.get('/', paisGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'El tamaño maximo es de 100 caracteres').isLength(100),
    validarCampos,
], paisPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], paisPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], paisDelete);


module.exports = router;