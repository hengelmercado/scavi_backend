const { Schema, model } = require('mongoose');

const EcgSchema = Schema({
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

EcgSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}

module.exports = model('Ecg', EcgSchema);