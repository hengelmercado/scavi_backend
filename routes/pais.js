const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { paisGet, paisPost, paisPut, paisDelete } = require('../controllers/pais');
const { message } = require('../dictionary/dictionary');

const router = Router();

router.get('/', paisGet);

router.post('/', [
    check('nombre', message.nombre_req).not().isEmpty(),
    check('descripcion', message.desc_tamano).isLength(100),
    validarCampos,
], paisPost);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos,
], paisPut);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos,
], paisDelete);


module.exports = router;