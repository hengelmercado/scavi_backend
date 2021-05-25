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

module.exports = model('Departamento', DepartamentoSchema);