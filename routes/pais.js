const { Router } = require('express');
const { check } = require('express-validator');
const { existePaisPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { paisGet, paisPost, paisPut, paisDelete, obtenerPais } = require('../controllers/pais');
const { message } = require('../dictionary/dictionary');

const router = Router();

router.get('/', paisGet);

router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existePaisPorId),
    validarCampos,
], obtenerPais);

router.post('/', [
    check('nombre', message.nombre_req).not().isEmpty(),
    validarCampos,
], paisPost);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existePaisPorId),
    validarCampos,
], paisPut);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existePaisPorId),
    validarCampos,
], paisDelete);


module.exports = router;