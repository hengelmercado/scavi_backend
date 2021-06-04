const { response } = require("express");
const { Convenio } = require("../models");

const obtenerConvenios = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const [ total, datos ] = await Promise.all([
        Convenio.countDocuments(),
        Convenio.findOne()
            .populate('pacientes')
            .populate('medicos')
            .populate('instrumentos')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, datos
    })
}

const obtenerConvenio = async(req, res = response) => {

    const { id } = req.params;

    const convenio = await Convenio.findById(id);

    res.json(convenio);

}

const crearConvenio = async(req, res = response) => {

    const { _id, ...datos } = req.body;

    const convenio = new Convenio(datos);
    await convenio.save();

    res.json(convenio);
}

const actualizarConvenio = async(req, res = response) => {

    const { id } = req.params;
    const { _id, ...datos } = req.body;

    const convenio = await Convenio.findByIdAndUpdate(id, datos, { new: true });

    res.json(convenio);

}

const borrarConvenio = async(req, res = response) => {

    const { id } = req.params;

    const convenio = await Convenio.findByIdAndUpdate(id, { habilitado: false }, { new: true });

    res.json(convenio);

}

module.exports = {
    actualizarConvenio,
    borrarConvenio,
    crearConvenio,
    obtenerConvenio,
    obtenerConvenios
}