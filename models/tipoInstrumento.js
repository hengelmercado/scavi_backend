const { Schema, model } = require('mongoose');
const { message } = require('../dictionary/dictionary');


const TipoInstrumentoSchema = Schema({
    nombre: {
        type: String,
        require: [true, message.nombre_req]
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