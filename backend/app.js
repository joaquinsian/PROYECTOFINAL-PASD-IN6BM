'use strict'
//Variables globales
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

//Cabeceras
app.use(cors());

//Importación de rutas
const Login_rutas = require('./src/routes/login.rutas')
const Usuario_rutas = require('./src/routes/usuario.rutas')


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//Utilización de las rutas
app.use('/PASD', Login_rutas)
app.use('/PASD', Usuario_rutas)

//Exportación
module.exports = app;