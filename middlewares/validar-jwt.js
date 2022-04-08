const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next ) => {
    const token = req.header('x-token');

    if(!token){
        return res.json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const usuario = await Usuario.findById(uid);
        
        if(!usuario){
            return res.json({
                msg: 'Token no válido - Usuario No esiste'
            })
        }

        if(!usuario.estado){
            return res.json({
                msg: 'Token no válido - Usuario con estado: false'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        return res.json({
            msg: 'Token no válido ' + error
        });
    }
}



module.exports = {
    validarJWT
}