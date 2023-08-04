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

    return { success: true, message: `Agregado el usuario id=${user_id} al bootcamp con id=${id}` };
  } catch (error) {
    return { success: false, message: "Error al agregar el usuario al Bootcamp" };
  }
};

// Obtener los Bootcamp por id llamado findById.
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findOne({
      where: { id: id },
      include: [{
        model: User,
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        }
      }],
    });
    if (!bootcamp) {
      return res.status(404).json({ message: "Bootcamp no encontrado" });
    }
    const bootcampsJSON = JSON.stringify(bootcamp);
    console.log("Consultando el Bootcamp id = 2, incluyendo los usuarios.\n" + bootcampsJSON + "\n\n");
    return res.json(bootcamp);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Bootcamp" });
  }
};


// Obtener todos los bootcamp incluyendo los usuarios llamado findAll.
const findBootcampAll = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: [{
        model: User,
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        }
      }],
    });

    const bootcampsJSON = JSON.stringify(bootcamps);
    console.log("Listar todos los Bootcamp con sus usuarios\n" + bootcampsJSON + "\n\n");
    res.status(200).json(bootcamps);
  } catch (error) {
    console.log(error.name, error.message);
    res.status(500).json({
      message: error.message,
      code: 500,
      name: error.name,
      mensajePersonalizado: 'Error al obtener los bootcamps'
    });
  }
};

export {
  createBootcamp,
  addUser,
  findById,
  findBootcampAll,
};
