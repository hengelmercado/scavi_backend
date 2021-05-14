
const { Schema, model } = require('mongoose');

const PersonaSchema = Schema({
    primer_nombre: {
        type: String,
        required: [true, 'El primer nombre es obligatorio']
    },
    segundo_nombre: {
        type: String,
        required: [true, 'El segundo nombre es obligatorio']
    },
    primer_Apellido: {
        type: String,
        required: [true, 'El primero apellido es obligatorio']
    },
    segundo_Apellido: {
        type: String,
        required: [true, 'El segundo apellido es obligatorio']
    },
    tipo_identificacion: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento',
        required: [true, 'El tipo de identificación es obligatorio']
    },
    numero_identificacion: {
        type: String,
        required: [true, 'El numero de identificación es obligatorio'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatoria'],
    },
    direccion: {
        type: Schema.Types.ObjectId,
        ref: 'Direccion',
        require: [true, 'La dirección es obligatoria']
    },
    sexo: {
        type: String,
        require: [true, 'El sexo es obligatorio']
    },
    fecha_de_nacimiento: {
        type: String,
        require: [true, 'La fecha de nacimiento es obligatorio']
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    habilitado: {
        type: Boolean,
        default: true,
        require: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

module.exports = model( 'Persona', PersonaSchema );
