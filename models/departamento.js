const { Schema, model } = require('mongoose');


const DepartamentoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio.']
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