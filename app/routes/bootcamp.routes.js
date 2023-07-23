import { Router } from "express";
import {
    createBootcamp,
    addUser,
    findById,
    findAll,
} from '../controllers/bootcamp.controller.js';

const bootcampRouter = Router();

bootcampRouter.post('/', createBootcamp);
bootcampRouter.post('/:id/users', addUser);
bootcampRouter.get('/:id', findById);
bootcampRouter.get('/', findAll);

export {
    bootcampRouter
}
