const {Schema, model} = require('mongoose');

const DireccionSchema = ({
    direccion: {
        type: String,
        require: [true, 'La dirección es obligatoria']
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