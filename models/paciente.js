const {Schema, model} = require('mongoose');

const PacienteSchema = Schema({
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona'
    },
    arl: {
        type: Schema.Types.ObjectId,
        ref: 'Tercero'
    },
    eps: {
        type: Schema.Types.ObjectId,
        ref: 'Tercero',
        require: true
    },
    afp: {
        type: Schema.Types.ObjectId,
        ref: 'Tercero'
    }
    
});


module.exports = model('Paciente', PacienteSchema);