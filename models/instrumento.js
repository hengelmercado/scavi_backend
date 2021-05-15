const { Schema, model } = require('mongoose');

const InstrumentoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    serial: {
        type: String,
        require: [true, 'El serial es obligatorio'],
        unique: true
    },
    tipoInstrumento: {
        type: Schema.Types.ObjectId,
        ref: 'TipoInstrumento',
        require: true
    },
    convenio: {
        type: Schema.Types.ObjectId,
        ref: 'Convenio'
    },
    habilitado: {
        type: Boolean,
        default: true,
        require: true
    }
});

module.exports = model('Isntumento', InstrumentoSchema);