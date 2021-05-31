const {Schema, model} = require('mongoose'); 
const { message } = require('../dictionary/dictionary');

const CargoSchema = Schema({
    nombre: {
        type: String,
        require: [true, message.nombre_req]
    },
    descripcion: {
        type: String
    },
    habilitado: {
        type: Boolean,
        default: true,
        require: true
    }
});

CargoSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}

module.exports = model('Cargo', CargoSchema);