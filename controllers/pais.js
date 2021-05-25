
const { response } = require("express");
const Pais = require('../models/pais');

const paisGet = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { habilitado: true }

    const [total, datos] = await Promise.all([
       Pais.countDocuments(query),
       Pais.find(query) 
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });
}

const paisPost = async(req, res = response) => {
    const { nombre, sigla } = req.body;
    const pais = new Pais({nombre, sigla});

    await pais.save();

    res.json({
        pais
    });
}

const paisPut = async(req, res = response) => {
    const {id} = req.params;
    const { _id, ...resto } = req.body;

    const pais = Pais.findByIdAndUpdate(id, resto);

    res.json({
        pais
    });
}

const paisDelete = async(req, res = response) => {
    const {id} = req.params;

    const pais = await Pais.findByIdAndUpdate(id, {habilitado: false});

    res.json({
        pais
    });
}


module.exports = {
    paisGet,
    paisPost,
    paisPut,
    paisDelete
}