const { response } = require('express');
const { Persona } = require('../models');

const obtenerPersonas = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {habilitado: true};
    
    const [total, datos] = await Promise.all([
        Persona.countDocuments(query),
        Persona.find(query)
            .populate('tipo_identificacion', 'nombre')
            .populate('direccion')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });

}

const obtenerPersona = async(req, res = response) => {

    const { id } = req.params;

    const persona = await Persona.findById(id)
                        .populate('tipo_identificacion', 'nombre')
                        .populate('direccion');

    res.json(persona);

}

const crearPersona = async(req, res = response) => {

    const  {_id, ...datos} = req.body;
    
    // Verificamos si el usuario existe
    const existeID = await Persona.findOne({numero_identificacion: datos.numero_identificacion});
    if (existeID) {
        return res.status(400).json({
            msg: 'El número de identificación ya esta registrado'
        })
    }
    
    const persona = new Persona(datos);
    await persona.save();

    res.json({
        persona
    });

}

const actualizarPersona = async(req, res = response) => {

    const {id} = req.params;
    const {_id, uid, google, ...datos} = req.body;

    /* const existeID = await Persona.findOne({numero_identificacion: datos.numero_identificacion});
    if (existeID) {
        return res.status(400).json({
            msg: 'El número de identificación ya esta registrado'
        })
    } */
    const persona = await Persona.findByIdAndUpdate(id, datos, { new:true });

    res.json({
        persona
    });

}

const borrarPersona = async(req, res = response) => {

    const {id} = req.params;
    const persona = await Persona.findByIdAndUpdate(id, {habilitado: false}, {new: true});

    res.json(persona);

}


module.exports = {
    obtenerPersonas,
    crearPersona,
    actualizarPersona,
    obtenerPersona,
    borrarPersona
}