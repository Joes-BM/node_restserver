const express = require("express");
const cors = require('cors');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath = '/api/usuarios'
    this.middlewares();
    this.routes();
  }

  //* MIDDELWARES
  middlewares() {
    // CORS
    this.app.use(cors());
    // LECTURA Y PARSEO DEL BODY
    this.app.use(express.json());
    // DIRECTORIO PUBLICO
    this.app.use(express.static("public"));
  }

  //* RUTAS
  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuario'))
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server corriendo en el puerto", this.port);
    });
  }
}
module.exports = Server;
