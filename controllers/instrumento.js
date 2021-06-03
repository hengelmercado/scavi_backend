const { response } = require("express");
const { message } = require('../dictionary/dictionary');
const { Instrumento } = require("../models");
const instrumento = require("../models/instrumento");
const { crearDireccion } = require("./direccion");

const obtenerInstrumentos = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { habilitado: true };

    const [total, datos] = await Promise.all([
        Instrumento.countDocuments(query),
        instrumento.find(query)
            .populate('TipoInstrumento', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, datos
    });
}

const obtenerInstrumento = async(req, res = response) => {

    const { id } = req.params;

    const instrumento = await Instrumento.findById(id);

    res.json(instrumento);

}

const crearInstrumento = async(req, res = response) => {

    const { _id, ...datos } = req.body;

    datos.serial = datos.serial.trim().toUpperCase();
    const datosDB = await Tercero.findOne({razonSocual: datos.razonSocial});
    if(datosDB){
        return res.status(400).json({
            msg: `${message.serial_existe} - ${datosDB.serial}`
        }); 
    }

    const instrumento = new Instrumento(datos);
    await instrumento.save();

    res.json(instrumento);
}

const actualizarInstrumento = async(req, res = response) => { 

    const { id } = req.params;
    const { _id, ...datos } = req.body;

    if(datos.serial){
        datos.serial = datos.serial.trim().toUpperCase();
    }
    const datosDB = await Tercero.findOne({razonSocual: datos.razonSocial});
    if(datosDB){
        return res.status(400).json({
            msg: `${message.serial_existe} - ${datosDB.serial}`
        }); 
    }

    const instrumento = await Instrumento.findByIdAndUpdate(id, datos, { new: true });

    res.json(instrumento);

}

const borrarIsntrumento = async(req, res = response) => {

    const { id } = req.params;

    const instrumento = await Instrumento.findByIdAndUpdate(id, { habilitado: false }, { new: true });

    res.json(instrumento);

}

module.exports = {
    actualizarInstrumento,
    borrarIsntrumento,
    crearInstrumento,
    obtenerInstrumento,
    obtenerInstrumentos,
}