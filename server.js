import 'dotenv/config';
import { sequelize } from './app/config/db.config.js';
import Index from './app/models/index.js';
import { createUser, findAll, updateUserById, deleteUserById, findUserById } from './app/controllers/user.controller.js';
import { createBootcamp, addUser, findBootcampAll, findById } from './app/controllers/bootcamp.controller.js';

const server = new Index(sequelize);

async function createDatabase() {
    try {

        //Crear base de datos
        await sequelize.sync({ force: true });
        console.log('Eliminando y resincronizando la base de datos.');

        //Crear usuarios
        const usersData = [
            {
                firstName: "Mateo",
                lastName: "Díaz",
                email: "mateo.diaz@correo.com",
            },
            {
                firstName: "Santiago",
                lastName: "Mejías",
                email: "santiago.mejias@correo.com",
            },
            {
                firstName: "Lucas",
                lastName: "Rojas",
                email: "lucas.rojas@correo.com",
            },
            {
                firstName: "Facundo",
                lastName: "Fernandez",
                email: "facundo.fernandez@correo.com",
            },
        ];

        for (const userData of usersData) {
            await createUser({ body: userData }, {
                json: (data) => {
                    console.log(data.message);
                },
                status: (code) => {
                    console.log(`Código de estado: ${code}`);
                }
            });
        }

        //Crear bootcamps
        const bootcampsData = [
            {
                title: "Introduciendo El Bootcamp De React",
                cue: 10,
                description: "React es la librería más usada en JavaScript para el desarrollo de interfaces",
            },
            {
                title: "Bootcamp Desarrollo Web Full Stack",
                cue: 12,
                description: "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares como JavaScript, nodeJS, Angular, MongoDB, ExpressJS",
            },
            {
                title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning",
                cue: 18,
                description: "Domina Data Science todo el ecosistema de lenguajes y herramientas de Big Data e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning",
            },
        ];

        for (const bootcampData of bootcampsData) {
            await createBootcamp({ body: bootcampData }, {
                json: (data) => {
                    console.log(data.message);
                },
                status: (code) => {
                    console.log(`Código de estado: ${code}`);
                }
            });
        }

        //Agregar usuarios al Bootcamp
        const usersToAdd = [
            { bootcampId: 1, userId: 1 },
            { bootcampId: 1, userId: 2 },
            { bootcampId: 2, userId: 1 },
            { bootcampId: 3, userId: 1 },
            { bootcampId: 3, userId: 2 },
            { bootcampId: 3, userId: 3 },
        ];

        for (const { bootcampId, userId } of usersToAdd) {
            const result = await addUser({ params: { id: bootcampId }, body: { user_id: userId } });
            if (result.success) {
                console.log(`***************************\n${result.message}\n***************************\n`);
            } else {
                console.error(result.message);
            }
        }

        //Consultando el Bootcamp id = 2, incluyendo los usuarios
        const testFindById = async () => {
            try {
                const req = {
                    params: { id: 2 },
                };
                const res = {
                    status: (statusCode) => ({
                        json: (data) => { }
                    })
                };
                await findById(req, res);
            } catch (error) {
                console.error('Error al obtener el bootcamp por id:', error.message);
            }
        }

        await testFindById();

        // Listar todos los Bootcamp con sus usuarios.
        const testFindBootcampAll = async () => {
            try {
                const req = {};
                const res = {
                    status: (statusCode) => ({
                        json: (data) => { }
                    })
                };

                await findBootcampAll(req, res);
            } catch (error) {
                console.error('Error al obtener los bootcamps:', error.message);
            }
        };

        await testFindBootcampAll();

        //Consultar un usuario por id, incluyendo los Bootcamp.
        const testFindUserById = async () => {
            try {
                const req = {
                    params: { id: 2 },
                };
                const res = {
                    status: (statusCode) => ({
                        json: (data) => { }
                    })
                };
                await findUserById(req, res);

            } catch (error) {
                console.error('Error al obtener el usuario 2:', error.message);
            }
        }

        await testFindUserById();


        // Listar los usuarios con sus Bootcamp.
        const testFindAll = async () => {
            try {
                const req = {};
                const res = {
                    status: (statusCode) => ({
                        json: (data) => { }
                    })
                };

                await findAll(req, res);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error.message);
            }
        }

        await testFindAll();


        // Actualizar el usuario según su id; por ejemplo: actualizar el usuario con id=1 por Pedro Sánchez.
        const testUpdateUserById = async () => {
            try {
                const req = {
                    params: { id: 1 },
                    body: {
                        firstName: "Pedro",
                        lastName: "Sánchez",
                        email: "pedro.sanchez@correo.com",
                    },
                };
                const res = {
                    status: (statusCode) => ({
                        json: (data) => { },
                    }),
                };

                await updateUserById(req, res);
            } catch (error) {
                console.error("Error al actualizar el usuario", error.message);
            }
        };

        await testUpdateUserById();



        // Eliminar un usuario por id; por ejemplo: el usuario con id=1.
        const testDeleteUserById = async () => {
            try {
                const req = {
                    params: { id: 1 },
                };
                const res = {
                    status: (statusCode) => ({
                        json: (data) => { },
                    }),
                };
                await deleteUserById(req, res);
            } catch (error) {
                console.error("Error al eliminar el usuario", error.message);
            }
        };

        await testDeleteUserById();







        server.listen();
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
    }
}

createDatabase();
