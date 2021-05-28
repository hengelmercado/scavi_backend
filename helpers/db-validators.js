const { message } = require('../dictionary/dictionary');
const { Departamento, Pais, Cargo, Persona, TipoDocumento, TipoInstrumento } = require('../models')


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


module.exports = {
    existeDepartamentoPorId,
    existeCargoPorId,
    existePaisPorId,
    existePersonaPorId,
    existeTipoDocumentoPorId,
    existeTipoInstrumentoPorId
}






