
const { response } = require('express');
const { message } = require('../dictionary/dictionary');
const Departamento = require('../models/departamento');


const obtenerDepartamentos = async(req, res = response) => {

    console.log(req);

    const { limite = 5, desde = 0} = req.query;
    const query = { habilitado: true };

    const [total, datos] = await Promise.all([
        Departamento.countDocuments(),
        Departamento.find(query)
            .populate('pais', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });
}

const obtenerDepartamento = async(req, res = response) => {

    const { id } = req.params;

    const datos = await Departamento.findById(id)
        .populate('pais', 'nombre');

    res.json(datos);
}

const crearDepartamento = async(req, res = response) => {

    const { _id, estado, ...datos } = req.body;
    
    datos.nombre = datos.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

    const departamentoDB = await Departamento.findOne({nombre: datos.nombre});
    if(departamentoDB){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${departamentoDB.nombre}`
        });
    }

    const departamento = new Departamento(datos);

    await departamento.save();

    res.json({
        departamento
    });
}

const actualizarDepartamento = async(req, res = response) => {

    const { id } = req.params;
    const { _id, habilitado, ...datos } = req.body;

    datos.nombre = datos.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    const departamentoDB = await Departamento.findOne({nombre: datos.nombre});
    if(departamentoDB && String(departamentoDB._id) !== id){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${departamentoDB.nombre}`
        });
    }

    const departamento = await Departamento.findByIdAndUpdate(id, datos, {new: true});

    res.json(departamento);
}

const borrarDepartamento = async(req, res = response) => {

    const { id } = req.params;

    const departamento = await Departamento.findByIdAndUpdate(id, { habilitado: false }, { new: true });

    res.json(departamento);
}

module.exports = {
    obtenerDepartamentos,
    obtenerDepartamento,
    crearDepartamento,
    actualizarDepartamento,
    borrarDepartamento
}
