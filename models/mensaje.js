const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    fecha: {
        type: Number
    },
    remitente: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        require: true
    },
    emisor: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        require: true
    },
    mensaje: {
        type: String
    },
    habilitado: {
        type: Boolean,
        default: true,
        require: true
    }
});

MensajeSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}

MensajeSchema.methods.find =  async function(params, callback) {
    const count = await model(params.collection).countDocuments(params.query, callback);
    const datos = await model(params.collection).find(params.query, callback)
       .limit(Number(params.limite))
       .skip(Number(params.desde));
    const result = {
        'count': count,
        'datos': datos
    }
   return result;
}

MensajeSchema.methods.findOne = async (params, callback) => {
    return await model(params.collection).find().limit(Number(params.limite)).skip(Number(params.desde));
}

MensajeSchema.methods.findById = async function(params, callback) {
    return await model(params.collection).findById(params.id, callback);
}

const find = (collection) => {

    const ecgModel = model(collection, MensajeSchema);
    return new ecgModel();
}

const findById = (collection, id) => {

    const ecgModel = model(collection, MensajeSchema);
    const promise = new Promise((resolve, reject) => {

        const entity = new ecgModel();
        entity.findById({collection, id}, function(error, result){
            if(error){
                console.log(error);
                reject(error);
            }else{
                resolve(result);
            }
        });

    });

    return promise;
}

const findOne = (collection, query) => {
    const ecgModel = model(collection, MensajeSchema);
    const promise = new Promise((resolve, reject) => {

        const entity = new ecgModel();
        entity.findLast({collection, query}, function(error, result){
            if(error){
                console.log(error);
                reject(error);
            }else{
                if(result.length > 0)
                    resolve(result[0]);
            }
        });

    });

    return promise;
}

const create = (collection, data) => {

    const ecgModel = model(collection, MensajeSchema);
    return new ecgModel(data);
}

const update = (collection, data, conditions) => {

    const ecgModel = model(collection, MensajeSchema);
    
    const promise = new Promise((resolve, reject) => {
    
        const result = ecgModel.findByIdAndUpdate(conditions, data, {new : true}, function(error){
            if(error){
                console.log('Error:', error)
                reject(error);
            }else{
                resolve(result);
            }
        });
    })

    return promise;
}

module.exports = {
    find,
    findById,
    findOne,
    create,
    update
};