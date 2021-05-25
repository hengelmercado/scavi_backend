const {Schema, model} = require('mongoose');
const { message } = require('../dictionary/dictionary');

const ConvenioSchema = Schema({
    nombre: {
        type: String,
        require: [true, message.nombre_req]
    },
    descripcion: {
        type: String
    },
    pacientes: [{
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
    }],
    medicos: [{
        type: Schema.Types.ObjectId,
        ref: 'Medico',
    }],
    instrumentos: [{
        type: Schema.Types.ObjectId,
        ref: 'Instrumentos',
    }],
    fecha_inicio: {
        type: Number,
    },
    fecha_finalizacion: {
        type: Number,
    },
    habilitado: {
        type: Boolean,
        require: true,
        default: true
    }
});



module.exports = model('Convenio', ConvenioSchema);