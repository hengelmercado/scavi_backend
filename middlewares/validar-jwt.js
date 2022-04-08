const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next ) => {
    const token = req.header('x-token');

    if(!token){
        return res.json({
            token: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const {_id, _v, ...datos} = await Usuario.findById(uid);
        let usuario = datos._doc;
        
        if(!usuario){
            return res.json({
                token: false,
                msg: 'Token no válido - Usuario No esiste'
            })
        }

        if(!usuario.estado){
            return res.json({
                token: false,
                msg: 'Token no válido - Usuario con estado: false'
            })
        }


        usuario.uid = _id;       
        req.usuario = usuario;

        next();
    } catch (error) {
        return res.json({
            token: false,
            msg: 'Token no válido ' + error
        });
    }
}



module.exports = {
    validarJWT
}