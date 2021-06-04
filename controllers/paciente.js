const { response } = require("express");
const { Paciente } = require("../models");

const obtenerPacientes = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const [ total, datos ] = await Promise.all([
        Paciente.countDocuments(),
        Paciente.findOne()
            .populate('persona')
            .populate('instrumento')
            .populate('arl')
            .populate('eps')
            .populate('afp')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, datos
    })
}

const obtenerPaciente = async(req, res = response) => {

    const { id } = req.params;

    const paciente = await Paciente.findById(id);

    res.json(paciente);

}

const crearPaciente = async(req, res = response) => {

    const { persona, instrumento, arl, eps, afp } = req.body;
    
    const datos = {
        persona,
        instrumento,
        arl,
        eps,
        afp
    }

    const paciente = new Paciente(datos);
    await paciente.save();

    res.json(paciente);
}

const actualizarPaciente = async(req, res = response) => {

    const { id } = req.params;
    const { persona, instrumento, arl, eps, afp } = req.body;

    const datos = {
        persona,
        instrumento,
        arl,
        eps,
        afp
    }

    const paciente = await Paciente.findByIdAndUpdate(id, datos, { new: true });

    res.json(paciente);

}

module.exports = {
    actualizarPaciente,
    crearPaciente,
    obtenerPaciente,
    obtenerPacientes
}