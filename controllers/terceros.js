const { response } = require("express");
const { message } = require("../dictionary/dictionary");
const { Tercero } = require("../models");

const obtenerTerceros = async(req, res = response) => {

    const { limite = 5, desde = 0 } =  req.query;
    const query = { habilitado: true };

    const [ total, datos ] = await Promise.all([
        Tercero.countDocuments(query),
        Tercero.find(query)
        .populate('tipoDocumento', 'nombre')
        .populate('direccion')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total, datos
    });
}

const obtenerTercero = async(req, res = response) => {
    
    const { id } = req.params;

    const tercero = await Tercero.findById(id)
                            .populate('tipoDocumento', 'nombre')
                            .populate('direccion');

    res.json(tercero);
}

const crearTercer = async(req, res = response) => {

    const { _id, ...datos } = req.body;

    datos.razonSocial = datos.razonSocial.toUpperCase();
    const datosDB = await Tercero.findOne({razonSocual: datos.razonSocial});
    if(datosDB){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${datosDB.razonSocial}`
        }); 
    }

    const tercero = new Tercero(datos);
    await tercero.save();

    res.json(tercero);
}

const ActualizarTercer = async(req, res = response) => {

    const { id } = req.params;
    const { _id, ...datos } = req.body;

    if(datos.razonSocial){
        datos.razonSocial = datos.razonSocial.toUpperCase();
    }
    const datosDB = await Tercero.findOne({razonSocual: datos.razonSocial});
    if(datosDB){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${datosDB.razonSocial}`
        }); 
    }

    const tercero = await Tercero.findByIdAndUpdate(id, datos, { new:true });

    res.json(tercero);
}

const borrarTercer = async(req, res = response) => {

    const { id } = req.params;

    const tercero = await Tercero.findByIdAndUpdate(id, {habilitado: false}, { new:true });

    res.json(tercero);
}

module.exports = {
    ActualizarTercer,
    crearTercer,
    borrarTercer,
    obtenerTercero,
    obtenerTerceros
}