const { response } = require("express");
const { message } = require("../dictionary/dictionary");
const Registro = require('../models/registro');

const obtenerRegistros = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {habilitado: true};

    const [total, datos] = await Promise.all([
        Registro.countDocuments(query),
        Registro.find(query)
        .populate('usuario', 'nombre')
        .populate('ccosto')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    })
    
}
const obtenerRegistro = async(req, res = response) => {

    const {id} = req.params;
    const registro = await Registro.findById(id)
        .populate('usuario', 'nombre')
        .populate('ccosto');

    res.json(registro);

}
const crearRegistros = async(req, res = response) => {

    console.log(req.usuario)

    const { _id, ...datos } = req.body;
    const { uid } = req.usuario;

    datos.usuario = uid;

    const registro = new Registro(datos);
    await registro.save();

    res.json(registro);

}
const actualizarRegistros = async(req, res = response) => {

    const { id } = req.params;
    const { _id, ...datos } = req.body;

    const registro = await Registro.findByIdAndUpdate(id, datos, { new:true });

    res.json(registro);

}
const borrarRegistros = async(req, res = response) => {
    const { id } = req.params;

    const registro = await Registro.findByIdAndUpdate(id, {habilitado: false}, { new:true });

    res.json(registro);
}

module.exports = {
    obtenerRegistros,
    obtenerRegistro,
    crearRegistros,
    actualizarRegistros,
    borrarRegistros
}