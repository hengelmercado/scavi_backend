const { response } = require("express");
const TipoDocumento = require('../models/tipoDocumento');

const tipoDocumentoGet = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { habilitado: true }

    const [total, datos] = await Promise.all([
       TipoDocumento.countDocuments(query),
       TipoDocumento.find(query) 
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });
}

const tipoDocumentoPost = async(req, res = response) => {
    const { nombre, sigla } = req.body;
    const tipoDocumento = new TipoDocumento({nombre, sigla});

    await tipoDocumento.save();

    res.json({
        tipoDocumento
    });
}

const tipoDocumentoPut = async(req, res = response) => {
    const {id} = req.params;
    const { _id, ...resto } = req.body;

    const tipoDocumento = TipoDocumento.findByIdAndUpdate(id, resto);

    res.json({
        tipoDocumento
    });
}

const tipoDocumentoDelete = async(req, res = response) => {
    const {id} = req.params;

    const tipoDocumento = await TipoDocumento.findByIdAndUpdate(id, {habilitado: false});

    res.json({
        tipoDocumento
    });
}


module.exports = {
    tipoDocumentoGet,
    tipoDocumentoPost,
    tipoDocumentoPut,
    tipoDocumentoDelete
}