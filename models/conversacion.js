const { Schema, model } = require('mongoose');

const ConversacionSchema = Schema({

    mensajes: {
        type: [Schema.Types.ObjectId],
        ref: 'Mensaje',
        require: true
    },
    habilitado: {
        type: Boolean,
        default: true,
        require: true
    }

}, {collection: "Conversaciones"});

module.exports = model('Conversacion', ConversacionSchema);