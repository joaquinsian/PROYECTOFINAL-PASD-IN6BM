'use strict'
//Variables globales
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const initial = require("./src/libs/initialSetup")

//Cabeceras
app.use(cors());

//Importación de rutas
const Admin_rutas = require('./src/routes/admin.rutas')
const Usuario_rutas = require('./src/routes/usuario.rutas')
const Citas_rutas = require('./src/routes/citas.rutas')
const Info_rutas = require('./src/routes/informacion.rutas')
const Login_rutas = require('./src/routes/login.rutas');
//const { crearPregunta } = require('./src/controller/pregunta.controller')


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//Utilización de las rutas
app.use('/PASD', Admin_rutas)
app.use('/PASD', Login_rutas)
app.use('/PASD', Usuario_rutas)
app.use('/PASD', Citas_rutas)
app.use('/PASD', Info_rutas)
app.use("/PASD", require("./src/routes/pregunta.rutas"));
app.use("/PASD", require("./src/routes/juego.rutas"));
app.use("/PASD", require("./src/routes/respuesta_de_usuario.rutas"));
app.use("/PASD", require("./src/routes/resultado_usuario.rutas"))


// Configuracion inicial
initial.crearJuego();
initial.agregarPreguntas();

//Exportación
module.exports = app;