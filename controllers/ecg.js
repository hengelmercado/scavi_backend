
const { response } = require("express");
const { message } = require("../dictionary/dictionary");
const Ecg = require('../models/ecg');

const ecgGet = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { habilitado: true }

    const [total, datos] = await Promise.all([
       Ecg.countDocuments(query),
       Ecg.find(query) 
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });
}

const obtenerecg = async(req, res = response) => {

    const ecg = await Ecg.find({'habilitado':true}).sort('-timestamp').limit(1);

    res.json(ecg);
}

const ecgPost = async(req, res = response) => {

    const { _id, habilitado, ...datos } = req.body;
    datos.nombre = await datos.nombre.replace(/^\w/, (c) => c.toUpperCase());

    const ecgDB = await Ecg.findOne({nombre: datos.nombre});
    if(ecgDB){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${ecgDB.nombre}`
        });
    }
    
    const ecg = new Ecg(datos);

    await ecg.save();

    res.json({
        ecg
    });
}

const ecgPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, habilitado, ...datos } = req.body;
    if(datos.nombre){
        datos.nombre = datos.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }
    
    const ecgDB = await Ecg.findOne({nombre: datos.nombre});
    if(ecgDB && String(ecgDB._id) !== id){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${ecgDB.nombre}`
        });
    }

    const ecg = await Ecg.findByIdAndUpdate(id, datos, {new: true});

    res.json({
        ecg
    });
}

const ecgDelete = async(req, res = response) => {
    const { id } = req.params;

    const ecg = await Ecg.findByIdAndUpdate(id, {habilitado: false}, {new: true});

    res.json({
        ecg
    });
}


module.exports = {
    ecgGet,
    obtenerecg,
    ecgPost,
    ecgPut,
    ecgDelete
}