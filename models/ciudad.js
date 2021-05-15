const { Schema, model } = require('mongoose');


const CiudadSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio.']
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

module.exports = model('Ciudad', CiudadSchema);