const { response } = require('express');
const TipoInstrumento = require('../models/tipoInstrumento');


const tipoInstrumentoGet = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {habilitado: true};

    const { total, datos } = await Promise.all([
        TipoInstrumento.countDocuments(),
        TipoInstrumento.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });
}

const tipoInstrumentoPost = async(req, res = response) => {

    const { nombre, descripcion } = req.body;

    const tipoInstrumento = new TipoInstrumento({nombre, descripcion});

    await tipoInstrumento.save();

    res.json({
        tipoInstrumento
    });
}

const tipoInstrumentoPut = async(req, res = response) => {
    
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const tipoInstrumento = TipoInstrumento.findByIdAndUpdate(id, resto);

    res.json({
        tipoInstrumento
    });
}

const tipoInstrumentoDelete = async(req, res = response) => {
    
    const { id } = req.params;

    const tipoInstrumento = TipoInstrumento.findByIdAndUpdate(id, {habilitado: false});

    res.json({
        tipoInstrumento
    });
}

module.exports = {
    tipoInstrumentoGet,
    tipoInstrumentoPost,
    tipoInstrumentoPut,
    tipoInstrumentoDelete
}