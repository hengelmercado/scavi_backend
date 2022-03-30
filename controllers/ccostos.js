const { response } = require('express');
const { message } = require('../dictionary/dictionary');
const Ccosto = require('../models/ccosto');

const obtenCcostos = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {habilitado: true};

    const [total, datos] = await Promise.all([
        Ccosto.countDocuments(query),
        Ccosto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        datos
    });

}

const obtenCcosto = async(req, res = response) => {

    const { id } = req.params;
    const ccosto = await Ccosto.findById(id);
    res.json(ccosto);

}

const crearCcosto = async(req, res = response) => {

    let datos = req.body;
    datos.code = datos.code.trim().toUpperCase(); //toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    const datoDB = await Ccosto.findOne({code: datos.code});
    if(datoDB){
        return res.status(400).json({
            msg: `El Centro de costo ya existe - ${datoDB.code}`
        });
    }

    

    const ccosto = new Ccosto(datos);
    await ccosto.save();

    res.json(ccosto);


}

const actualizarCcosto = async(req, res = response) => {

    const {id} = req.params;
    const { _id, ...datos } = req.body;

    if(datos.code){
        datos.code = datos.code.trim().toUpperCase();//toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }
    const datoDB = await Ccosto.findOne({code: datos.code});
    if(datoDB) {
        return res.status(400).json({
            msg: `El codigo ya existe - ${datoDB.code}`
        });
    }
    const ccosto = await Ccosto.findByIdAndUpdate(id, datos, {new: true});
    res.json({ccosto});
}

const borrarCcosto = async(req, res = response) => {
    const {id} = req.params;
    
    const ccosto = await Ccosto.findByIdAndUpdate(id, {habilitado: false}, { new: true });

    res.json({
        ccosto
    });
}

module.exports = {
    obtenCcostos,
    obtenCcosto,
    crearCcosto,
    actualizarCcosto,
    borrarCcosto
}