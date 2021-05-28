
const { response } = require("express");
const { message } = require("../dictionary/dictionary");
const Pais = require('../models/pais');

const paisGet = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { habilitado: true }

    const [total, datos] = await Promise.all([
       Pais.countDocuments(query),
       Pais.find(query) 
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });
}

const obtenerPais = async(req, res = response) => {

    const { id } = req.params;

    const pais = await Pais.findById(id);

    res.json(pais);
}

const paisPost = async(req, res = response) => {

    const { _id, habilitado, ...datos } = req.body;
    datos.nombre = await datos.nombre.replace(/^\w/, (c) => c.toUpperCase());

    const paisDB = await Pais.findOne({nombre: datos.nombre});
    if(paisDB){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${paisDB.nombre}`
        });
    }
    
    const pais = new Pais(datos);

    await pais.save();

    res.json({
        pais
    });
}

const paisPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, habilitado, ...datos } = req.body;
    datos.nombre = await datos.nombre.replace(/^\w/, (c) => c.toUpperCase());
    
    const paisDB = await Pais.findOne({nombre: datos.nombre});

    if(paisDB && String(paisDB._id) !== id){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${paisDB.nombre}`
        });
    }

    const pais = await Pais.findByIdAndUpdate(id, datos, {new: true});

    res.json({
        pais
    });
}

const paisDelete = async(req, res = response) => {
    const { id } = req.params;

    const pais = await Pais.findByIdAndUpdate(id, {habilitado: false}, {new: true});

    res.json({
        pais
    });
}


module.exports = {
    paisGet,
    obtenerPais,
    paisPost,
    paisPut,
    paisDelete
}