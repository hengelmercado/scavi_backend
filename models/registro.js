const {Schema, model} = require('mongoose'); 
const { message } = require('../dictionary/dictionary');

const RegistroSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    ccosto: {
        type: Schema.Types.ObjectId,
        ref: 'Ccosto',
        require: [true, message.ccosto_req]
    },
    timeStamp: {
        type: Number,
        require: [true, message.fecha]
    },
    entrada: {
        type: Boolean,
        require: true,
        default: true
    },
    habilitado: {
        type: Boolean,
        require: true,
        default: true
    }
});

RegistroSchema.methods.toJSON = function() {
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}


module.exports = model( 'Registro', RegistroSchema );