
const { response } = require('express');
const Departamento = require('../models/departamento');


const departamentoGet = async(req, res = response) => {

    const { limite = 5, desde = 0} = req.query;
    const query = { habilitado: true };

    const {total, datos} = await Promise.all([
        Departamento.countDocuments(),
        Departamento.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });
}

const departamentoPost = async(req, res = response) => {

    const { nombre, descripcion, pais } = req.body;
    
    const departamento = new Departamento({ nombre, descripcion, pais });

    await departamento.save();

    res.json({
        departamento
    });
}

const departamentoPut = (req, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;
}

module.exports = {
    departamentoGet,
    departamentoPost,
    departamentoPut,
    departamentoDelete
}
