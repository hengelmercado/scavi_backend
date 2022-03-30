const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { obtenCcostos, obtenCcosto, crearCcosto, actualizarCcosto, borrarCcosto } = require('../controllers/ccostos');
const { message } = require('../dictionary/dictionary');

const router = Router();

router.get('/', obtenCcostos);

router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos
], obtenCcosto);

router.post('/', [
    check('code', message.ccosto_req).not().isEmpty(),
    check('direccion', message.dir_req).not().isEmpty(),
    validarCampos
], crearCcosto);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos
], actualizarCcosto);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    validarCampos
], borrarCcosto);

module.exports = router;