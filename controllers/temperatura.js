
const { response } = require("express");
const { message } = require("../dictionary/dictionary");
const Temperatura = require('../models/temperatura');

const temperaturaGet = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { habilitado: true }

    const [total, datos] = await Promise.all([
       Temperatura.countDocuments(query),
       Temperatura.find(query) 
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });
}

const obtenertemperatura = async(req, res = response) => {

    const { id } = req.params;

    const temperatura = await Temperatura.findById(id);

    res.json(temperatura);
}

const temperaturaPost = async(req, res = response) => {

    const { _id, habilitado, ...datos } = req.body;
    datos.nombre = await datos.nombre.replace(/^\w/, (c) => c.toUpperCase());

    const temperaturaDB = await Temperatura.findOne({nombre: datos.nombre});
    if(temperaturaDB){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${temperaturaDB.nombre}`
        });
    }
    
    const temperatura = new Temperatura(datos);

    await temperatura.save();

    res.json({
        temperatura
    });
}

const temperaturaPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, habilitado, ...datos } = req.body;
    if(datos.nombre){
        datos.nombre = datos.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }
    
    const temperaturaDB = await Temperatura.findOne({nombre: datos.nombre});
    if(temperaturaDB && String(temperaturaDB._id) !== id){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${temperaturaDB.nombre}`
        });
    }

    const temperatura = await Temperatura.findByIdAndUpdate(id, datos, {new: true});

    res.json({
        temperatura
    });
}

const temperaturaDelete = async(req, res = response) => {
    const { id } = req.params;

    const temperatura = await Temperatura.findByIdAndUpdate(id, {habilitado: false}, {new: true});

    res.json({
        temperatura
    });
}


module.exports = {
    temperaturaGet,
    obtenertemperatura,
    temperaturaPost,
    temperaturaPut,
    temperaturaDelete
}