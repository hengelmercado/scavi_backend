const {Schema, model} = require('mongoose');
const { message } = require('../dictionary/dictionary');

const CcostoSchema = Schema({
    code: {
        type: String,
        require: [true, message.codigo],
        unique: true
    },
    name: {
        type: String,
        require: [true, message.nombre_req]
    },
    direccion: {
        type: String,
        require: [true, message.dir_req]
    },
    habilitado: {
        type: Boolean,
        require: true,
        default: true
    }
});

CcostoSchema.methods.toJSON = function(){
    const {__V, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

module.exports = model('Ccosto', CcostoSchema);