const {Schema, model} = require('mongoose'); 
const { message } = require('../dictionary/dictionary');

const CargoSchema = Schema({
    nombre: {
        type: String,
        require: [true, message.nombre_req]
    },
    descipcion: {
        type: String
    },
    habilitado: {
        type: Boolean,
        default: true,
        require: true
    }
});

module.exports = model('Cargo', CargoSchema);