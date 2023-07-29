import express from 'express';
import { userRouter } from '../routes/user.routes.js';
import { bootcampRouter } from '../routes/bootcamp.routes.js';
import { User } from '../models/user.model.js';
import { Bootcamp } from '../models/bootcamp.model.js';

export default class Index {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3500;
        this.middlewares();
        this.routes();
        this.setupDatabase();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }
    
    routes() {
        this.app.use('/users', userRouter);
        this.app.use('/bootcamps', bootcampRouter);
    }

    setupDatabase() {
        User.belongsToMany(Bootcamp, {
            through: 'user_bootcamp',
            foreignKey: 'user_id',
        });

        Bootcamp.belongsToMany(User, {
            through: 'user_bootcamp',
            foreignKey: 'bootcamp_id',
        });
    }

    listen() {
        this.app.listen(this.port, () => {
        })
    }
}
