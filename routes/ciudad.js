const { Router } = require('express');
const { check } = require('express-validator');
const { existePaisPorId, existeDepartamentoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { message } = require('../dictionary/dictionary');
const { crearCiudad, obtenerCiudades } = require('../controllers/ciudad');


const router = Router();

router.get('/', obtenerCiudades);

router.post('/', [
    check('nombre', message.nombre_req),
    check('departamento', message.id_no_valid).isMongoId(),
    validarCampos,
], crearCiudad);


module.exports = router;