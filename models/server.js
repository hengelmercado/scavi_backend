const express = require('express');
const cors = require('cors');
const { rutas } = require('../dictionary/dictionary')
const {dbConnection} = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Conectar a base de datos
        this.connectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    
    }

    async connectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors({ origin: '*' }));

        // Lectuta y escritura de el body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(rutas.auth, require('../routes/auth'));
        this.app.use(rutas.cargo, require('../routes/cargo'));
        this.app.use(rutas.ciudad, require('../routes/ciudad'));
        this.app.use(rutas.ecg, require('../routes/ecg'));
        this.app.use(rutas.departamento, require('../routes/departamento'));
        this.app.use(rutas.direccion, require('../routes/direccion'));
        this.app.use(rutas.instrumento, require('../routes/instrumento'));
        this.app.use(rutas.mensaje, require('../routes/mensaje'));
        this.app.use(rutas.pais, require('../routes/pais'));
        this.app.use(rutas.persona, require('../routes/persona'));
        this.app.use(rutas.temperatura, require('../routes/temperatura'));
        this.app.use(rutas.tercero, require('../routes/tercero'));
        this.app.use(rutas.tipoDocumento, require('../routes/tipoDocumento'));
        this.app.use(rutas.tipoInstrumento, require('../routes/tipoInstrumento'));
        this.app.use(rutas.tipoInstrumento, require('../routes/tipoInstrumento'));
        this.app.use(rutas.usuario, require('../routes/usuarios'));
        this.app.use(rutas.dataInstrument, require('../routes/dataInstrument'));
        this.app.use(rutas.ccosto, require('../routes/ccosto'));
        this.app.use(rutas.registro, require('../routes/registro'));
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;