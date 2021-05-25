const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { tipoInstrumentoGet, tipoInstrumentoPost, tipoInstrumentoPut, tipoInstrumentoDelete } = require('../controllers/tipoInstrumento');
const { message } = require('../dictionary/dictionary');

const router = Router();

router.get('/', tipoInstrumentoGet);

router.post('/', [
    check('nombre', message.nombre_req).not().isEmpty(),
    check('descripcion', message.desc_tamano).isLength(100),
    validarCampos,
], tipoInstrumentoPost);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos,
], tipoInstrumentoPut);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos,
], tipoInstrumentoDelete);


module.exports = router;