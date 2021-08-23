const { Schema, model } = require('mongoose');

const EcgSchema = Schema({
    time:{
        type: Number
    },
    leadOn:{
        type: Boolean
    },
    activity:{
        type: Boolean
    },
    HR:{
        type: Number
    },
    rri:{
        type: [Number]
    },
    rwl:{
        type: [Number]
    },
    accList: {
        type: [Object]
    },
    ecg:{
        type: [Number]
    },
    magnification:{
        type: Number
    },
    ecgFrequency:{
        type: Number
    },
    accAccuracy:{
        type: Number
    },
    accFrequency:{
        type: Number
    },
    protocol:{
        type: String
    },
    hwVer:{
        type: String
    },
    fwVer:{
        type: String
    },
    flash:{
        type: Boolean
    },
    receiveTime:{
        type: Number
    },
    RR:{
        type: Number
    },
    avRR:{
        type: Number
    },
    ecgMV:{
        type: [Number]
    },
    deviceSN:{
        type: String
    },
    deviceID:{
        type: String
    },
    deviceName:{
        type: String
    },
    instrumento: {
        type: Schema.Types.ObjectId,
        ref: 'Instrumento',
        require: true
    },
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        require: true
    },
    habilitado: {
        type: Boolean,
        require: true,
        default: true
    }
});

EcgSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id;
    return data
}


 EcgSchema.methods.find =  async function(params, callback) {
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

EcgSchema.methods.findById = async function(params, callback) {
    return await model(params.collection).findById(params.id, callback);
}

EcgSchema.methods.findLast = async (params, callback) => {
    return await model(params.collection).find(params.query.habilitado, callback).sort(params.query.sort).limit(params.query.limite);
}

const find = (collection, query, {limite=10, desde=0}) => {

    let count = 0;
    const ecgModel = model(collection, EcgSchema);
    
    const primise = new Promise((resolve, reject) => {
        
        let object = {};
        var entity = new ecgModel();
        entity.find({collection, query, limite, desde}, function(error, result){
            if(error) {
                console.log(error);
                reject(error);
            } else {
                count += 1;
                if(count == 1){
                    object['count'] = result;
                }else{
                    object['datos'] = result
                    resolve(object);
                }
            }
        });
    });
    return primise;
}

const findById = (collection, id) => {

    const ecgModel = model(collection, EcgSchema);
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
    const ecgModel = model(collection, EcgSchema);
    const promise = new Promise((resolve, reject) => {

        const entity = new ecgModel();
        entity.findLast({collection, query}, function(error, result){
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

const create = (collection, data) => {

    const ecgModel = model(collection, EcgSchema);
    
    const promise = new Promise((resolve, reject) => {
        const ecgEntity = new ecgModel(data);
        ecgEntity.save(function(error){
            if(error){
                console.log('Error:', error)
                reject(error);
            }else{
                resolve(ecgEntity);
            }
        });
    })

    return promise;
}

const update = (collection, data, conditions) => {

    const ecgModel = model(collection, EcgSchema);
    
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



function pluralize (str) {
    var rule, found;
    if (!~uncountables.indexOf(str.toLowerCase())){
        found = rules.filter(function(rule){
            return str.match(rule[0]);
        });
        if (found[0]) return str.replace(found[0][0], found[0][1]);
    }
    return str;
}
  


module.exports = {
    find,
    findById,
    findOne,
    create,
    update
}