const { response } = require("express");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/usuario");


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario) {
            return res.json({
                ok: false,
                msg: 'Correo / Contraseña no son correctos - correo'
            });
        }

        // Si el usuario esta activo
        if(!usuario.estado) {
            return res.json({
                ok: false,
                msg: 'Correo / Contraseña no son correctos - estado'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.json({
                ok: false,
                msg: 'Correo / Contraseña no son correctos - Contraseña'
            })
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });    
    }



}

const googleSignIn = (req, res = response) => {

    res.json({
        msg: 'Todo OK googel signin'
    })
}


module.exports = {
    login,
    googleSignIn
};