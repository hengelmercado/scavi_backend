const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { tipoDocumentoGet, tipoDocumentoPost, tipoDocumentoPut, tipoDocumentoDelete } = require('../controllers/tipoDocumento');


const router = Router();

router.get('/', tipoDocumentoGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('siglas', 'La siglas son obligatorias').not().isEmpty(),
    validarCampos,
], tipoDocumentoPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], tipoDocumentoPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], tipoDocumentoDelete);


module.exports = router;