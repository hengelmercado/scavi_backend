const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeMedicoPorId, existePersonaPorId, existeInstrumentoPorId, existeCargoPorId, existeConvenioPorId } = require('../helpers/db-validators');
const { obtenerMedicos, obtenerMedico } = require('../controllers/medico');
const { message } = require('../dictionary/dictionary');

const router = Router();

router.get('/', obtenerMedicos);

router.get('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeMedicoPorId),
    validarCampos,
], obtenerMedico);

router.post('/', [
    check('persona', message.id_no_valid).isMongoId(),
    check('persona').custom(existePersonaPorId),
    check('instrumento', message.id_no_valid).isMongoId(),
    check('instrumento').custom(existeInstrumentoPorId),
    check('cargo', message.id_no_valid).isMongoId(),
    check('cargo').custom(existeCargoPorId),
    check('convenio', message.id_no_valid).isMongoId(),
    check('convenio').custom(existeConvenioPorId),
    validarCampos,
], crearCargo);

router.put('/:id', [
    check('id', message.id_no_valid).isMongoId(),
    check('id').custom(existeCargoPorId),
    validarCampos,
], actualizarCargo);

module.exports = router;