import express from 'express';

export default class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3500;
        this.routes();
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send("Hola mundo")
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto: ${this.port}`)
        })
    }
}