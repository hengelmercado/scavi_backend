const { Ciudad } = require("../models");
const { convertirObjectId } = require('../helpers/convertir-object-id');
const { message } = require('../dictionary/dictionary');

const obtenerCiudades = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {habilitado: true};

    const [ total, datos ] = await Promise.all([
        Ciudad.countDocuments(),
        Ciudad.find(query)
            .populate('departamento', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, datos
    })

}

const obtenerCiudad = async(req, res = response) => {

    const {id} = req.params

    const ciudad = await Ciudad.findById(id).populate('departamento', 'nombre');

    res.json(ciudad);

}

const crearCiudad = async(req, res = response) => {

    const { _id, habilitado, ...datos } = req.body;

    datos.nombre = datos.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

    const ciudadDB = await Ciudad.findOne({ nombre:datos.nombre });
    if(ciudadDB){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${ciudadDB.nombre}`
        });
    }

    const ciudad = new Ciudad(datos);
    await ciudad.save();

    res.json(ciudad);
}

const actualizarCiudad = async(req, res = response) => {

    const { id } = req.params;
    const { _id, habilitado, ...datos } = req.body;
    if(datos.nombre){
        datos.nombre = datos.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }

    const ciudadDB = await Ciudad.findOne({ nombre:datos.nombre });
    if(ciudadDB && id !== String(ciudadDB._id)){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${ciudadDB.nombre}`
        });
    }

    const ciudad = await Ciudad.findByIdAndUpdate(id, datos, { new: true });

    res.json(ciudad);
}

const borrarCiudad = async(req, res = response) => {
    
    const { id } = req.params;

    const ciudad = await Ciudad.findByIdAndUpdate(id, { habilitado: false }, { new: true });

    res.json(ciudad);
}

module.exports = {
    actualizarCiudad,
    borrarCiudad,
    crearCiudad,
    obtenerCiudad,
    obtenerCiudades,
}