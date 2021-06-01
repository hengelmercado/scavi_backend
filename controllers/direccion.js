const { response } = require("express");
const { Direccion } = require("../models");

const obtenerDirecciones = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { habilitado: true };

    const [total, datos] = await Promise.all([
        Direccion.countDocuments(query),
        Direccion.find(query)
            .populate('pais', 'nombre')
            .populate('departamento', 'nombre')
            .populate('ciudad', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, datos
    });
}

const obtenerDireccion = async(req, res = response) => {

    const { id } = req.params;

    const direccion = await Direccion.findById(id)
                                .populate('pais', 'nombre')
                                .populate('departamento', 'nombre')
                                .populate('ciudad', 'nombre');

    res.json(direccion);

}

const crearDireccion = async(req, res = response) => {

    const { _id, ...datos } = req.body;

    const direccion = new Direccion(datos);
    await direccion.save();


    res.json(direccion);
}

const actualizarDireccion = async(req, res = response) => {

    const { id } = req.params;
    const { _id, ...datos } = req.body

    const direccion = await Direccion.findByIdAndUpdate(id, datos, { new: true });

    res.json(direccion);

}

const borrarDirecciones = async(req, res = response) => {

    const { id } = req.params;

    const direccion = await Direccion.findByIdAndUpdate(id, {habilitado: false}, { new: true });

    res.json(direccion);

}

module.exports = {
    actualizarDireccion,
    borrarDirecciones,
    crearDireccion,
    obtenerDireccion,
    obtenerDirecciones,
}