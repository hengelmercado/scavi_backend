const { Schema, model } = require('mongoose');

const TemperaturaSchema = Schema({
    serial: {
        type: String
    },
    frs: {
        type: Number
    },
    rh: {
        type: Number
    },
    habilitado: {
        type: Boolean,
        require: true,
        default: true
    }
});

TemperaturaSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}

module.exports = model('Temperatura', TemperaturaSchema);