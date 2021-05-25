const { Schema, model } = require('mongoose');
const { message } = require('../dictionary/dictionary');


const PaisSchema = Schema({
    nombre: {
        type: String,
        require: [true, message.nombre_req]
    },
    descripcion: {
        type: String
    },
    habilitado: {
        type: Boolean,
        require: true,
        default: true
    }
}, { collection: 'Paises'});

module.exports = model('Pais', PaisSchema);