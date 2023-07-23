import { request, response } from "express";
import { Bootcamp } from "../models/bootcamp.model.js";


const createBootcamp = async (req = request, res = response) => {
  try {
    const { title, cue, description } = req.body;
    const newBootcamp = await Bootcamp.create({ 
      title, 
      cue, 
      description 
    });
       return res.status(201).json(newBootcamp);
  }  catch (error) {
    console.log(error.name, error.message);
    res.status(500).json({
      message: error.message,
      code: 500,
      name: error.name,
      mensajePersonalizado: 'Error en el servidor, create bootcamp'
    });
  }
};



export {
  createBootcamp,
  addUser,
  findById,
  findAll,
};
