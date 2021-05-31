const {Schema, model} = require('mongoose');

const PacienteSchema = Schema({
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona'
    },
    instrumento: [{
        type: Schema.Types.ObjectId,
        ref: 'Instrumento'
    }],
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

PacienteSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}

module.exports = model('Paciente', PacienteSchema);