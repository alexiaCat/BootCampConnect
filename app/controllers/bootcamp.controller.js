import { request, response } from "express";
import { Bootcamp } from "../models/bootcamp.model.js";
import { User } from "../models/user.model.js"

// Crear y guardar un nuevo Bootcamp llamado createBootcamp.
const createBootcamp = async (req = request, res = response) => {
  try {
    const { title, cue, description } = req.body;
    const newBootcamp = await Bootcamp.create({
      title,
      cue,
      description
    });

    const message = `Creado el bootcamp: {
      "id": ${newBootcamp.id},
      "title": "${newBootcamp.title}",
      "cue": ${newBootcamp.cue},
      "description": "${newBootcamp.description}",
      "updatedAt": "${newBootcamp.updatedAt}",
      "createdAt": "${newBootcamp.createdAt}"
    }`;

    console.log(`>> ${message}`);

    return res.json({
      message: "Creado el bootcamp",
      bootcamp: newBootcamp,
    });

  } catch (error) {
    console.log(error.name, error.message);
    res.status(500).json({
      message: error.message,
      code: 500,
      name: error.name,
      mensajePersonalizado: 'Error en el servidor, create bootcamp'
    });
  }
};

// Agregar un Usuario al Bootcamp llamado addUser.
const addUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    const bootcamp = await Bootcamp.findByPk(id);
    const user = await User.findByPk(user_id);

    await bootcamp.addUser(user);
    const message = `***************************\nAgregado el usuario id=${user_id} al bootcamp con id=${id}\n***************************`;

    console.log(message);
    return res.json({
      message: `Se ha agregado el usuario ${user_id} al Bootcamp ${id}`
    });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el usuario al Bootcamp" });
  }
};

// Obtener los Bootcamp por id llamado findById.
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findByPk(id);
    if (!bootcamp) {
      return res.status(404).json({ message: "Bootcamp no encontrado" });
    }
    res.json(bootcamp);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Bootcamp" });
  }
};


// Obtener todos los Usuarios incluyendo los Bootcamp llamado findAll.
const findAll = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: [User],
    });
    res.json(bootcamps);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los Bootcamps" });
  }
};

export {
  createBootcamp,
  addUser,
  findById,
  findAll,
};
