const { response } = require("express");
const Medico = require('../models/medico');

const obtenerMedicos = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const [ total, datos ] = await Promise.all([
        Medico.countDocuments(),
        Medico.findOne()
            .populate('persona')
            .populate('instrumento')
            .populate('cargo')
            .populate('Convenio')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, datos
    })
}

const obtenerMedico = async(req, res = response) => {

    const { id } = req.params;

    const medico = await Medico.findById(id);

    res.json(medico);

}

const crearMedico = async(req, res = response) => {

    const { persona, instrumento, cargo, convenio } = req.body;
    
    const datos = {
        persona,
        instrumento,
        cargo,
        convenio
    }

    const medico = new Medico(datos);
    await medico.save();

    res.json(medico);
}

const actualizarMedico = async(req, res = response) => {

    const { id } = req.params;
    const { persona, instrumento, cargo, convenio } = req.body;
    
    const datos = {
        persona,
        instrumento,
        cargo,
        convenio
    }

    const medico = await Medico.findByIdAndUpdate(id, datos, { new: true });

    res.json(medico);

}

module.exports = {
    actualizarMedico,
    crearMedico,
    obtenerMedico,
    obtenerMedicos
}