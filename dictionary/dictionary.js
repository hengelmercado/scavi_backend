

const message = {
    nombre_req              :   'El nombre es obligatorio.',
    dir_req                 :   'La dirección es obligatoria.',
    serial_req              :   'El serial es obligatorio.',
    prim_nombre_req         :   'El primer nombre es obligatorio.',
    seg_nombre_req          :   'El segundo nombre es obligatorio.',
    prim_apellido_req       :   'El primero apellido es obligatorio.',
    seg_apellido_req        :   'El segundo apellido es obligatorio.',
    tipo_identificacion_req :   'El tipo de identificación es obligatorio.',
    num_identificacion_req  :   'El numero de identificación es obligatorio.',
    correo_req              :   'El correo es obligatorio.',
    telefono_req            :   'El telefono es obligatoria.',
    sexo_req                :   'El sexo es obligatorio.',
    fecha_naci_req          :   'La fecha de nacimiento es obligatorio.',
    razon_soci_req          :   'La razón social es obligatoria.',
    persona_cont_req        :   'La persona de contacto es obligatoria.',
    siglas_req              :   'Las siglas son obligatorias.',
    id_no_valid             :   'No es un ID válido.',
    desc_tamano             :   'El tamaño maximo es de 100 caracteres.',
    id_no_existe            :   'El ID no existe:',

    nombre_existe           :   'El nombre ya existe',
    serial_existe           :   'El serial ya existe',
}

const referencias = {

}

const rutas = {
    auth            :   '/api/auth',
    cargo           :   '/api/cargo',
    ciudad          :   '/api/ciudad',
    departamento    :   '/api/departamento',
    direccion       :   '/api/direccion',
    ecg             :   '/api/ecg',
    instrumento     :   '/api/instrumento',
    mensaje         :   '/api/mensaje',
    pais            :   '/api/pais',
    persona         :   '/api/persona',
    temperatura     :   '/api/temperatura',
    tercero         :   '/api/tercero',
    tipoDocumento   :   '/api/tipoDocumento',
    tipoInstrumento :   '/api/tipoInstrumento',
    usuario         :   '/api/usuario',
    dataInstrument  :   '/api/dataInstrument',
}





module.exports = {
    message,
    referencias,
    rutas
}