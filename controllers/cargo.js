
const { response } = require("express");
const { message } = require('../dictionary/dictionary');
const Cargo = require('../models/cargo');

const obtenerCargos = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { habilitado: true }

    const [total, datos] = await Promise.all([
       Cargo.countDocuments(query),
       Cargo.find(query) 
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });
}

const obtenerCargo = async(req, res = response) => {
    const { id } = req.params;

    const cargo = await Cargo.findById(id);

    res.json(cargo);
}

const crearCargo = async(req, res = response) => {
    let { nombre, descripcion } = req.body;
    nombre = nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    const datoDB = await Cargo.findOne({nombre});
    if(datoDB) {
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${datoDB.nombre}`
        });
    }
    const cargo = new Cargo({nombre, descripcion});

    await cargo.save();

    res.json({
        cargo
    });
}

const actualizarCargo = async(req, res = response) => {
    const {id} = req.params;
    const { _id, ...datos } = req.body;
    if(datos.nombre){
        datos.nombre = datos.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }

    const datoDB = await Cargo.findOne({nombre: datos.nombre});
    if(datoDB) {
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${datoDB.nombre}`
        });
    }
    const cargo = await Cargo.findByIdAndUpdate(id, datos, {new: true});

    res.json({
        cargo
    });
}

const borrarCargo = async(req, res = response) => {
    const {id} = req.params;
    
    const cargo = await Cargo.findByIdAndUpdate(id, {habilitado: false}, { new: true });

    res.json({
        cargo
    });
}


module.exports = {
    actualizarCargo,
    borrarCargo,
    crearCargo,
    obtenerCargo,
    obtenerCargos,
}