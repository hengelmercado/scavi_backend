const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req, res = response) => {

    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, datos] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    
    res.json({
        total,
        datos
    });
} 
const usuariosPut = (req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, ...resto} = req.body;

    // TODO: Validar conta base de datos
    if(password){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
} 
const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, rol, img} = req.body;
    const usr = new Usuario({nombre, correo, password, rol, img});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usr.password = bcryptjs.hashSync(password, salt);

    // Guardar en la DB
    await usr.save();

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


    /* res.json({
        ok: true,
        usuario
    }); */
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controller'
    });
} 
const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario
    });
} 


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}