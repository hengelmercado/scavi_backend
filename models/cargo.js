const {Schema, model} = require('mongoose') 

const CargoSchema = ({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
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