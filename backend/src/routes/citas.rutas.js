'use strict'

const express = require('express')
const citasController = require('../controller/citas.controller')

//rutas
var api = express.Router();
api.post('/crearCitas', citasController.crearCitas);

module.exports = api;