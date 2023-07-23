import { request, response } from "express";
import { User } from "../models/user.model.js";
import { Bootcamp } from "../models/bootcamp.model.js";


// funciona
const findAll = async (req = request, res = response) => {
  try {
    const arregloUsers = await User.findAll();
    res.status(200).json(arregloUsers);
  } catch (error) {
    console.log(error.name, error.message);
    res.status(500).json({
      message: error.message,
      code: 500,
      name: error.name,
      mensajePersonalizado: 'Error en el servidor, findAll User'
    });
  }
}

// funciona
const createUser = async (req = request, res = response) => {
  try {
    const { firstname, lastname, email } = req.body;

    const user = await User.create({
      firstname,
      lastname,
      email,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error.name, error.message);
    res.status(500).json({
      message: error.message,
      code: 500,
      name: error.name,
      mensajePersonalizado: 'Error en el servidor, create user'
    });
  }
};



export {
  createUser,
  findUserById,
  findAll,
  updateUserById,
  deleteUserById,
};
