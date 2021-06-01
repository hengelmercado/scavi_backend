const { response } = require('express');
const { message } = require('../dictionary/dictionary');
const TipoInstrumento = require('../models/tipoInstrumento');


const obtenerTipoInstrumentos = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {habilitado: true};

    const [total, datos] = await Promise.all([
        TipoInstrumento.countDocuments(query),
        TipoInstrumento.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });
}

const obtenerTipoInstrumento = async(req, res = response) => {
    const { id } = req.params;

    const tipoInstruemnto = await TipoInstrumento.findById(id);

    res.json(tipoInstruemnto);
}

const crearTipoInstrumento = async(req, res = response) => {

    const { ...datos } = req.body;

    datos.nombre = datos.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    const datosDB = await TipoInstrumento.findOne({nombre: datos.nombre});
    if (datosDB) {
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${datosDB.nombre}`
        });
    }

    const tipoInstrumento = new TipoInstrumento(datos);
    await tipoInstrumento.save();

    res.json({
        tipoInstrumento
    });
}

const actualizarTipoInstrumento = async(req, res = response) => {
    
    const { id } = req.params;
    const { _id, ...datos } = req.body;

    if(datos.nombre){
        datos.nombre = datos.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }
    const datosDB = await TipoInstrumento.findOne({nombre: datos.nombre});
    if (datosDB && String(datosDB._id) !== id) {
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${datosDB.nombre}`
        });
    }

    const tipoInstrumento = await TipoInstrumento.findByIdAndUpdate(id, datos, { new: true });

    res.json({
        tipoInstrumento
    });
}

const borrarTipoInstrumento = async(req, res = response) => {
    
    const { id } = req.params;

    const tipoInstrumento = await TipoInstrumento.findByIdAndUpdate(id, {habilitado: false}, { new: true });

    res.json({
        tipoInstrumento
    });
}

module.exports = {
    actualizarTipoInstrumento,
    borrarTipoInstrumento,
    crearTipoInstrumento,
    obtenerTipoInstrumento,
    obtenerTipoInstrumentos,
}