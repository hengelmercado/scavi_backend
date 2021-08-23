
const { response } = require("express");
const { message } = require("../dictionary/dictionary");
const {Ecg, find, findOne, findById, create, update} = require('../models/ecg');

const obtenerTodos = async(req, res = response ) => {

    const query = { habilitado: true }
    const {collection} = req.body;

    const datos = await find(collection, query, req.query);

    res.json(datos);
}

const obtenerPorId = async(req, res = response) => {

    const { id } = req.params;
    const { collection} = req.body;

    const datos = await findById(collection, id);

    res.json(datos);
}

const obtenerUltimo = async(req, res = response) => {

    //const ecg = await Ecg.find({'habilitado':true}).sort('-timestamp').limit(1);

    const { collection } = req.params;
    const query = {
        habilitado: {
            'habilitado':true
        },
        sort:'-timestamp',
        limite: 1 
    }

    const datos = await findOne(collection, query);

    res.json(datos);
}

const crearRegistro = async(req, res = response) => {

    const { _id, habilitado, collection, ...datos } = req.body;    
    const registro = await create(collection, datos)

    res.json(registro);
}

const actualizarRegistro = async(req, res = response) => {
    const { id, collection } = req.params;
    const { _id, habilitado, ...datos } = req.body;

    const actualizar = await update(collection, datos, id);

    res.json(actualizar);
}

const borrarRegistro = async(req, res = response) => {
    const { id, collection } = req.params;

    const actualizar = await update(collection, {habilitado: false}, id);

    res.json(actualizar);
}


module.exports = {
    obtenerTodos,
    obtenerPorId,
    obtenerUltimo,
    ecgPost: crearRegistro,
    ecgPut: actualizarRegistro,
    ecgDelete: borrarRegistro
}