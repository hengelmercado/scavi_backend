const { Ciudad } = require("../models");

const obtenerCiudades = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.params;
    const query = {habilitado: true};

    const [ total, datos ] = await Promise.all([
        Ciudad.countDocuments(),
        Ciudad.find(query)
            .populate('departamento', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, datos
    })

}

const crearCiudad = async(req, res = response) => {

    const { _id, habilitado, ...datos } = req.body;

    datos.nombre = datos.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

    const ciudadDB = await Ciudad.findOne({ nombre:datos.nombre });
    if(ciudadDB){
        return res.status(400).json({
            msg: `${message.nombre_existe} - ${ciudadDB.nombre}`
        });
    }

    const ciudad = new Ciudad(datos);
    await ciudad.save();

    res.json(ciudad);
}


module.exports = {
    obtenerCiudades,
    crearCiudad
}