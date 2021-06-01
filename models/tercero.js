const {Schema, model} = require('mongoose');
const { message } = require('../dictionary/dictionary');

const TerceroSchema = Schema({
    tipoDocumento: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento',
        require: true
    },
    numeroDocumento: {
        type: String,
        require: [true, message.numero_identificacion],
        unique: true
    },
    razonSocial: {
        type: String,
        require: [true, message.razon_soci_req]
    },
    personaContacto: {
        type: String,
        require: [true, message.persona_cont_req]
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

TerceroSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}

module.exports = model('Tercero', TerceroSchema);