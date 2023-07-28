import { request, response } from "express";
import { User } from "../models/user.model.js";
import { Bootcamp } from "../models/bootcamp.model.js";



// Crear y guardar usuarios llamado createUser.
const createUser = async (req = request, res = response) => {
  try {
    const { firstname, lastname, email } = req.body;

    const user = await User.create({
      firstname,
      lastname,
      email,
    });


    const message = `Se ha creado el usuario: {
      "id": ${user.id},
      "firstName": "${user.firstname}",
      "lastName": "${user.lastname}",
      "email": "${user.email}",
      "updatedAt": "${user.updatedAt}",
      "createdAt": "${user.createdAt}"
    }`;


    console.log(`>> ${message}`);

    return res.json({
      message: "Se ha creado el usuario",
      user,
    });

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

// Obtener los Bootcamp de un usuario llamado findUserById.
const findUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id: id },
      include: [Bootcamp],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user.Bootcamps);
  } catch (error) {
    console.log(error.name, error.message);
    res.status(500).json({
      message: error.message,
      code: 500,
      name: error.name,
      mensajePersonalizado: 'Error en el servidor, al obtener los Bootcamp de un usuario'
    });
  }
};



// Obtener todos los Usuarios incluyendo, los Bootcamp llamado findAll.
const findAll = async (req = request, res = response) => {
  try {
    const arregloUsers = await User.findAll({
      include: [Bootcamp],
    });
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


// Actualizar usuario por Id llamado updateUserById.
const updateUserById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await user.update({ firstname, lastname, email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};


//Eliminar un usuario por Id llamado deleteUserById.
const deleteUserById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await user.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

export {
  createUser,
  findUserById,
  findAll,
  updateUserById,
  deleteUserById,
};
