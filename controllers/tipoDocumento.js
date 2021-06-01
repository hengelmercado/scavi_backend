const { response } = require("express");
const { message } = require('../dictionary/dictionary');
const TipoDocumento = require('../models/tipoDocumento');

const obtenerTipoDocumentos = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { habilitado: true }

    const [total, datos] = await Promise.all([
       TipoDocumento.countDocuments(query),
       TipoDocumento.find(query) 
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });
}

const obtenerTipoDocumento = async(req, res = response) => {
 
    const { id } = req.params;

    const tipoDocumento = await TipoDocumento.findById(id);

    res.json(tipoDocumento);

}

const crearTipoDocumento = async(req, res = response) => {
    const {...datos} = req.body;
    datos.nombre = datos.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    
    const datosDB = await TipoDocumento.findOne({nombre: datos.nombre});
    if (datosDB) {
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${datosDB.nombre}`
        });
    }
    
    const tipoDocumento = new TipoDocumento(datos);
    await tipoDocumento.save();

    res.json({
        tipoDocumento
    });
}

const actualizarTipoDocumento = async(req, res = response) => {
    const {id} = req.params;
    const { _id, ...datos } = req.body;

    if(datos.nombre){
        datos.nombre = datos.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }
    
    const datosDB = await TipoDocumento.findOne({nombre: datos.nombre});
    if (datosDB && String(datosDB._id) !== id) {
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${datosDB.nombre}`
        });
    }

    const tipoDocumento = await TipoDocumento.findByIdAndUpdate(id, datos, { new: true });

    res.json({
        tipoDocumento
    });
}

const borrarTipoDocumento = async(req, res = response) => {
    const {id} = req.params;

    const tipoDocumento = await TipoDocumento.findByIdAndUpdate(id, {habilitado: false}, { new: true });

    res.json({
        tipoDocumento
    });
}


module.exports = {
    actualizarTipoDocumento,
    borrarTipoDocumento,
    crearTipoDocumento,
    obtenerTipoDocumento,
    obtenerTipoDocumentos,
}