const { message } = require('../dictionary/dictionary');
const { Departamento, Pais, Cargo, Persona, TipoDocumento, TipoInstrumento, Ciudad, Direccion, Tercero, Instrumento } = require('../models');
const { findById } = require('../models/ecg');
const Medico = require('../models/medico');

const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRole = await Role.findOne({rol});
    if(!existeRole){
        throw new Error(`El rol ${rol} no está registrado en la DB`)
    }
}

const correoExiste = async(correo = '') => {
    const existeEmail =  await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe`)
    }
}

const usuarioExistePorId = async(id = '') => {

    const existeUsuario =  await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID no existe ${id}`)
    }
}

const existeDepartamentoPorId = async(id = '') => {
    const existeDepartamento = await Departamento.findById(id);
    if( !existeDepartamento ) {
        throw new Error(message.id_no_existe, id)
    }
}

const existeCargoPorId = async(id = '') => {
    const existeCargo =  await Cargo.findById(id);
    if (!existeCargo) {
        throw new Error(message.id_no_existe, id)
    }    
}

const existePaisPorId = async(id = '') => {
    const existePais =  await Pais.findById(id);
    if (!existePais) {
        throw new Error(message.id_no_existe, id)
    }
}

const existeCiudadPorId = async(id = '') => {
    const existeCiudad =  await Ciudad.findById(id);
    if (!existeCiudad) {
        throw new Error(message.id_no_existe, id)
    }
}

const existePersonaPorId = async(id = '') => {
    const existePersona =  await Persona.findById(id);
    if (!existePersona) {
        throw new Error(message.id_no_existe, id)
    }
}

const existeTipoDocumentoPorId = async(id = '') => {
    const existeTipoDocumento =  await TipoDocumento.findById(id);
    if (!existeTipoDocumento) {
        throw new Error(message.id_no_existe, id)
    }
}

const existeTipoInstrumentoPorId = async(id = '') => {
    const existeTipoInstrumento =  await TipoInstrumento.findById(id);
    if (!existeTipoInstrumento) {
        throw new Error(message.id_no_existe, id)
    }
}

const existeDireccionPorId = async(id = '') => {
    const existeDireccion =  await Direccion.findById(id);
    if (!existeDireccion) {
        throw new Error(message.id_no_existe, id)
    }

}

const existeTerceroPorId = async(id = '') => {
    const datos =  await Tercero.findById(id);
    if (!datos) {
        throw new Error(message.id_no_existe, id)
    }
}

const existeInstrumentoPorId = async(id = '') => {
    const datos =  await Instrumento.findById(id);
    if (!datos) {
        throw new Error(message.id_no_existe, id)
    }
}

const existeMedicoPorId = async(id = '') => {
    const datos =  await Medico.findById(id);
    if (!datos) {
        throw new Error(message.id_no_existe, id)
    }
}

const existeConvenioPorId = async(id = '') => {
    const datos =  await Convenio.findById(id);
    if (!datos) {
        throw new Error(message.id_no_existe, id)
    }
}

const existeEcgPorId = async(collection, id) => {

    console.log('collection', collection);

    const datos = await findById(collection, id);
    if (!datos) {
        throw new Error(message.id_no_existe, id)
    }
}

module.exports = {
    esRolValido,
    correoExiste,
    usuarioExistePorId,
    existeCargoPorId,
    existeCiudadPorId,
    existeDepartamentoPorId,
    existePaisPorId,
    existePersonaPorId,
    existeTipoDocumentoPorId,
    existeTipoInstrumentoPorId,
    existeDireccionPorId,
    existeTerceroPorId,
    existeInstrumentoPorId,
    existeMedicoPorId,
    existeConvenioPorId,
    existeEcgPorId,
}






