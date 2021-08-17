const { Router } = require('express');
const { check } = require('express-validator');
const { existeecgPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { ecgGet, ecgPost, ecgPut, ecgDelete, obtenerecg } = require('../controllers/ecg');
const { message } = require('../dictionary/dictionary');

const router = Router();

router.get('/', ecgGet);

router.get('/:id', obtenerecg);

router.post('/', [
    validarCampos,
], ecgPost);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeecgPorId),
    validarCampos,
], ecgPut);

router.delete('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeecgPorId),
    validarCampos,
], ecgDelete);


module.exports = router;