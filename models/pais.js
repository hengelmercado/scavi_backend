const { Schema, model } = require('mongoose');


const PaisSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio.']
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