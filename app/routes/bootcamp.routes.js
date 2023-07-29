import { Router } from "express";
import {
    createBootcamp,
    addUser,
    findById,
    findBootcampAll,
} from '../controllers/bootcamp.controller.js';

const bootcampRouter = Router();

bootcampRouter.post('/', createBootcamp);
bootcampRouter.post('/:id/users', addUser);
bootcampRouter.get('/:id', findById);
bootcampRouter.get('/', findBootcampAll);

export {
    bootcampRouter
}
