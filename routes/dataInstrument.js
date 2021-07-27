const { Router } = require('express');
const { obtenerDatos } = require('../controllers/dataInstrument');

const router = Router();

router.get('/',  obtenerDatos);

module.exports = router;




