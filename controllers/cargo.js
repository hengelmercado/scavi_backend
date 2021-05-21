
const { response } = require("express");
const Cargo = require('../models/cargo');

const cargoGet = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { habilitado: true }

    const [total, datos] = await Promise.all([
       Cargo.countDocuments(query),
       Cargo.find(query) 
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });
}

const cargoPost = async(req, res = response) => {
    const { nombre, sigla } = req.body;
    const cargo = new Cargo({nombre, sigla});

    await cargo.save();

    res.json({
        cargo
    });
}

const cargoPut = async(req, res = response) => {
    const {id} = req.params;
    const { _id, ...resto } = req.body;

    const existecargo =  await Cargo.findById(id);
    if (!existecargo) {
        throw new Error(`El ID no existe ${id}`)
    }

    const cargo = Cargo.findByIdAndUpdate(id, resto);

    res.json({
        cargo
    });
}

const cargoDelete = async(req, res = response) => {
    const {id} = req.params;

    const existecargo =  await Cargo.findById(id);
    if (!existecargo) {
        throw new Error(`El ID no existe ${id}`)
    }

    const cargo = await Cargo.findByIdAndUpdate(id, {habilitado: false});

    res.json({
        cargo
    });
}


module.exports = {
    cargoGet,
    cargoPost,
    cargoPut,
    cargoDelete
}