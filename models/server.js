const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.tipoDocumentoPath = '/api/tipoDocumento';
        this.tipoInstrumentoPath = '/api/tipoInstrumento';
        
        // Conectar a base de datos
        this.cnnectarDB();

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
        this.app.use(cors());

        // Lectuta y escritura de el body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.tipoDocumentoPath, require('../routes/tipoDocumento'));
        this.app.use(this.tipoInstrumentoPath, require('../routes/tipoInstrumento'));
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        });
    }
}

module.exports = Server;