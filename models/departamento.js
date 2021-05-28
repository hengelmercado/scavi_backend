const { Schema, model } = require('mongoose');
const { message } = require('../dictionary/dictionary');


const DepartamentoSchema = Schema({
    nombre: {
        type: String,
        require: [true, message.nombre_req]
    },
    descripcion: {
        type: String
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        require: true
    },
    habilitado: {
        type: Boolean,
        require: true,
        default: true
    }
});

DepartamentoSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}

module.exports = model('Departamento', DepartamentoSchema);