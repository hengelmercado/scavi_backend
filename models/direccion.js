const {Schema, model} = require('mongoose');
const { message } = require('../dictionary/dictionary');

const DireccionSchema = Schema({
    direccion: {
        type: String,
        require: [true, message.dir_req]
    },
    ciudad: {
        type: Schema.Types.ObjectId,
        ref: 'Ciudad'
    },
    departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Pais'
    },
    zip: {
        type: String,
    }
}, { collection: 'direciones'});

module.exports = model('Direccion', DireccionSchema);