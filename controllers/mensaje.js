const { find, create } = require("../models/mensaje");

const obtenerTodos = async(req, res = response ) => {

    const { collection, limite, desde} = req.query; 
    const query = { habilitado: true }

    const Mensaje = find(collection);
    const datos = await Mensaje.find({collection, query, limite, desde});


    res.json(datos);
}

const obtenerPorId = async(req, res = response) => {

    const { id } = req.params;
    const { collection} = req.body;

    const datos = await findById(collection, id);

    res.json(datos);
}

const crearRegistro = async(req, res = response) => {

    const { _id, habilitado, collection, ...datos } = req.body;    

    const Mensaje = create(collection, datos);

    const registro = await Mensaje.save();

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
    crearRegistro,
    actualizarRegistro,
    borrarRegistro
}