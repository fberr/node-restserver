const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
        }


        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';


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

       this.app.use(this.paths.auth, require('../routes/auth'));
       this.app.use(this.paths.buscar, require('../routes/buscar'));
       this.app.use(this.paths.categorias, require('../routes/categorias'));
       this.app.use(this.paths.productos, require('../routes/productos'));
       this.app.use(this.paths.usuarios, require('../routes/usuarios'));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en',this.port);
        
        });


    }


}

module.exports = Server;