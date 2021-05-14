const {Schema, model} = require('mongoose');

const TerceroSchema = ({
    tipo_identificacion: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento',
        require: true
    },
    numero_identificacion: {
        type: String,
        require: [true, 'El numero de identificaciòn es obligatorio'],
        unique: true
    },
    razon_social: {
        type: String,
        require: [true, 'La razón social es obligatoria']
    },
    persona_contacto: {
        type: String,
        require: [true, 'La persona de contacto es obligatoria']
    },
    telefono: {
        type: String,
        require: [true, 'El telefono es obligatorio']
    },
    email: {
        type: String,
        require: [true, 'El email es obligatorio'],
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