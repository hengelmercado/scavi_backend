const {Schema, model} = require('mongoose');
const { message } = require('../dictionary/dictionary');

const TerceroSchema = Schema({
    tipo_identificacion: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento',
        require: true
    },
    numero_identificacion: {
        type: String,
        require: [true, message.numero_identificacion],
        unique: true
    },
    razon_social: {
        type: String,
        require: [true, message.razon_soci_req]
    },
    persona_contacto: {
        type: String,
        require: [true, ]
    },
    telefono: {
        type: String,
        require: [true, message.telefono_req]
    },
    email: {
        type: String,
        require: [true, message.correo_req],
        unique: true
    },
    direccion: {
        type: Schema.Types.ObjectId,
        ref: 'Direccion',
        require: true
    },
    habilitado: {
        type: Boolean,
        default: true,
        require: true
    }
});


module.exports = model('Tercero', TerceroSchema);