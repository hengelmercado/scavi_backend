const {Schema, model} = require('mongoose');
const { message } = require('../dictionary/dictionary');

const  TipoDocumentoSchema = Schema({
    nombre: {
        type: String,
        require: [true, message.nombre_req]
    },
    siglas: {
        type: String,
        require: [true, message.siglas_req]
    },
    habilitado: {
        type: Boolean,
        require: true,
        default: true
    }
});

module.exports = model('TipoDocumento', TipoDocumentoSchema);