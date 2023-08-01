### BootCampConnect

Este proyecto es parte del primer Sprint del equipo de desarrollo de software de una empresa de adiestramiento que desea diseñar la gestión de cursos Bootcamp. En este Sprint, se desarrollará una aplicación utilizando Node.js, PostgreSQL, Express y Sequelize para el registro de usuarios y cursos Bootcamp.

### Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

- Node.js
- PostgreSQL

### Instrucciones de configuración

1. Clona este repositorio en tu máquina local.

2. Instala las dependencias del proyecto ejecutando el siguiente comando en la raíz del proyecto:


`npm install`


1.Configura la base de datos PostgreSQL:
Crea una base de datos llamada db_bootcamp en PostgreSQL.


2.Configura la conexión a la base de datos:
Dentro de la carpeta config, en el archivo db.config.js.
Agrega un .env en la raíz del proyecto con tu configuración de entorno.

### Instrucciones para ejecutar el servidor
Para iniciar el servidor, ejecuta el siguiente comando en la raíz del proyecto:

`npm start`


### Dependencias utilizadas
*Express: Framework para el manejo de rutas y middleware.
*Sequelize: ORM (Object-Relational Mapping) para interactuar con la base de datos PostgreSQL.
*pg: Cliente de PostgreSQL para Node.js.
*nodemon: Herramienta para reiniciar automáticamente el servidor durante el desarrollo.