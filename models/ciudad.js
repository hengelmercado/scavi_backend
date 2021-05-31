const { Schema, model } = require('mongoose');
const { message } = require('../dictionary/dictionary');


const CiudadSchema = Schema({
    nombre: {
        type: String,
        require: [true, message.nombre_req]
    },
    descripcion: {
        type: String
    },
    departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
        require: true
    },
    habilitado: {
        type: Boolean,
        require: true,
        default: true
    }
}, { collection: 'Ciudades'});

CiudadSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}

module.exports = model('Ciudad', CiudadSchema);