const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // conectar a base de datos
        this.conectarDB();


        // middlewares
        this.middlewares();

        // lectura y parseo body
        this.app.use( express.json() );

        // rutas de nmi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // cors
        this.app.use(cors());

        // directorio publico 
        this.app.use( express.static('public') ); 
    }

    routes() {

       this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en',this.port);
        
        });


    }


}

module.exports = Server;