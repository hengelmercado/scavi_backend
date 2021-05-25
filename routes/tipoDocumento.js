const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { tipoDocumentoGet, tipoDocumentoPost, tipoDocumentoPut, tipoDocumentoDelete } = require('../controllers/tipoDocumento');
const { message } = require('../dictionary/dictionary');


const router = Router();

router.get('/', tipoDocumentoGet);

router.post('/', [
    check('nombre', message.nombre_req).not().isEmpty(),
    check('siglas', message.siglas_req).not().isEmpty(),
    validarCampos,
], tipoDocumentoPost);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos,
], tipoDocumentoPut);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos,
], tipoDocumentoDelete);


module.exports = router;