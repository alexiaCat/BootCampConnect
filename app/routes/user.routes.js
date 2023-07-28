import { Router } from "express";
import {
    createUser,
    findUserById,
    findAll,
    updateUserById,
    deleteUserById,
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/:id', findUserById);
userRouter.get('/', findAll);
userRouter.put('/:id', updateUserById);
userRouter.delete('/:id', deleteUserById);

export {
    userRouter
}

