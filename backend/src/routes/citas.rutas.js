'use strict'

const express = require('express')
const md_autenticacion = require('../middlewares/authenticated')
const citasController = require('../controller/citas.controller')

//rutas
var api = express.Router();
api.post('/crearCitas' ,md_autenticacion.ensureAuth, citasController.crearCitas);

module.exports = api;