const {Schema, model} = require('mongoose');

const  TipoDocumentoSchema = ({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    siglas: {
        type: String,
        require: [true, 'Las siglas son obligatorias']
    },
    habilitado: {
        type: Boolean,
        require: true,
        default: true
    }
});

module.exports = model('TipoDocumento', TipoDocumentoSchema);