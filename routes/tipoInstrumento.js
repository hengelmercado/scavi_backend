const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { tipoInstrumentoGet, tipoInstrumentoPost, tipoInstrumentoPut, tipoInstrumentoDelete } = require('../controllers/tipoInstrumento');

const router = Router();

router.get('/', tipoInstrumentoGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'El tamaño maximo es de 100 caracteres').isLength(100),
    validarCampos,
], tipoInstrumentoPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], tipoInstrumentoPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], tipoInstrumentoDelete);


module.exports = router;