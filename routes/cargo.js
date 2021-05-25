const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeCargoPorId } = require('../helpers/db-validators');
const { cargoGet, cargoPost, cargoPut, cargoDelete } = require('../controllers/cargo');
const { message } = require('../dictionary/dictionary');

const router = Router();

router.get('/', cargoGet);

router.post('/', [
    check('nombre', message.nombre_req).not().isEmpty(),
    check('descripcion', message.desc_tamano).isLength(100),
    validarCampos,
], cargoPost);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeCargoPorId),
    validarCampos,
], cargoPut);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeCargoPorId),
    validarCampos,
], cargoDelete);


module.exports = router;