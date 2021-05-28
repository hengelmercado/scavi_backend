const { Schema, model } = require('mongoose');
const { message } = require('../dictionary/dictionary');


const PaisSchema = Schema({
    nombre: {
        type: String,
        require: [true, message.nombre_req]
    },
    descripcion: {
        type: String
    },
    habilitado: {
        type: Boolean,
        require: true,
        default: true
    }
}, { collection: 'Paises'});

PaisSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}

module.exports = model('Pais', PaisSchema);