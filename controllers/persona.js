const { response } = require('express');
const Persona = require('../models/persona');
const { validationResult } = require('express-validator');

const personaGet = (req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};
    
    const [total, personas] = await Promise.all([
        Persona.countDocuments(query),
        Persona.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        personas
    });

}

const personaPost = (req, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const  {imagen_para_mostrar, tipo_de_identificación, numero_de_identificación, primer_nombre,
    segundo_nombre, primer_apellido, segundo_apellido, email, telefono, sexo,
    fecha_de_nacimiento} = req.body;
    
    const persona = new Persona({imagen_para_mostrar, tipo_de_identificación, numero_de_identificación, primer_nombre,
        segundo_nombre, primer_apellido, segundo_apellido, email, telefono, sexo,
        fecha_de_nacimiento});


    // Verificamos si el usuario existe
    const existeID = await Usuario.findOne({numero_de_identificación});
    if (existeID) {
        return res.status(400).json({
            msg: 'El número de identificación ya esta registrado'
        })
    }
    
    await persona.save();

    res.json({
        persona
    });

}

const personaPut = (req, res = response) => {

    const {id} = req.params;
    const {_id, tipo_de_identificación, numero_de_identificación, google, ...resto} = req.body;

    const persona = await Persona.findByIdAndUpdate(id, resto);

    res.json({
        persona
    });

}

const personaPatch = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'GET API Controller'
    });

}

const personaDelete = (req, res = response) => {

    const {id} = req.params;
    const persona = await Persona.findByIdAndUpdate(id, {estado: false});

    res.json(persona);

}


module.exports = {
    personaGet,
    personaPost,
    personaPut,
    personaPatch,
    personaDelete
}