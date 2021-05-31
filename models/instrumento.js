const { Schema, model } = require('mongoose');
const { message } = require('../dictionary/dictionary');

const InstrumentoSchema = Schema({
    nombre: {
        type: String,
        require: [true, message.nombre_req]
    },
    serial: {
        type: String,
        require: [true, message.serial_req],
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

InstrumentoSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}

module.exports = model('Isntumento', InstrumentoSchema);