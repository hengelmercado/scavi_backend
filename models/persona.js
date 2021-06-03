
const { Schema, model } = require('mongoose');
const { message } = require('../dictionary/dictionary');

const PersonaSchema = Schema({
    primer_nombre: {
        type: String,
        required: [true, message.prim_nombre_req]
    },
    segundo_nombre: {
        type: String,
        required: [true, message.seg_nombre_req]
    },
    primer_apellido: {
        type: String,
        required: [true, message.prim_apellido_req]
    },
    segundo_apellido: {
        type: String,
        required: [true, message.seg_apellido_req]
    },
    tipo_identificacion: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento',
        required: true
    },
    numero_identificacion: {
        type: String,
        required: [true, message.num_identificacion_req],
        unique: true
    },
    correo: {
        type: String,
        required: [true, message.correo_req],
        unique: true
    },
    telefono: {
        type: String,
        required: [true, message.telefono_req],
    },
    direccion: {
        type: Schema.Types.ObjectId,
        ref: 'Direccion',
        require: true
    },
    sexo: {
        type: String,
        require: [true, message.sexo_req]
    },
    fecha_de_nacimiento: {
        type: String,
        require: [true, message.fecha_naci_req]
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
    }
});

PersonaSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}

module.exports = model( 'Persona', PersonaSchema );
