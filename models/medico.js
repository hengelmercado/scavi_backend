const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    persona: {
        tyep: Schema.Types.ObjectId,
        ref: 'Persona',
        require: true
    },
    cargo: {
        type: Schema.Types.ObjectId,
        ref: 'Cargo',
        require: true
    },
    convenio: {
        type: Schema.Types.ObjectId,
        ref: 'Convenio',
        require: true
    }
});

MedicoSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}

module.exports = model('Medico', MedicoSchema);