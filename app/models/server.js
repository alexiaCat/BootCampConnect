import express from 'express';
import { userRouter } from '../routes/user.routes.js';
import { bootcampRouter } from '../routes/bootcamp.routes.js';

export default class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3500;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }
    
    routes() {
        this.app.use('/users', userRouter);
        this.app.use('/bootcamps', bootcampRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto: ${this.port}`)
        })
    }
}