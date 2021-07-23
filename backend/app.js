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
const Admin_rutas = require('./src/routes/admin.rutas')
const Login_rutas = require('./src/routes/login.rutas')
const Usuario_rutas = require('./src/routes/usuario.rutas')
const Citas_rutas = require('./src/routes/citas.rutas')


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//Utilización de las rutas
app.use('/PASD', Admin_rutas)
app.use('/PASD', Login_rutas)
app.use('/PASD', Usuario_rutas)
app.use('/PASD', Citas_rutas)

//Exportación
module.exports = app;