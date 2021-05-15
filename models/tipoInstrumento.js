const { Schema, model } = require('mongoose');


const TipoInstrumentoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    descripcion: {
        type: String,
    },
    habilitado: {
        type: Boolean,
        default: true,
        require: true
    }
});


module.exports = model('TipoInstrumento', TipoInstrumentoSchema);