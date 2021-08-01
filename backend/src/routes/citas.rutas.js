'use strict'

const express = require('express')
const md_autenticacion = require('../middlewares/authenticated')
const citasController = require('../controller/citas.controller')

//rutas
var api = express.Router();
api.post('/crearCitas' ,md_autenticacion.ensureAuth, citasController.crearCitas);
api.get('/obtenerCitas', citasController.obtenerCitas);
api.get('/obtenerCitasID/:idCita', citasController.obtenerCitasID);
api.put('/editarCitas/:idCita', citasController.editarCitas);
api.delete('/eliminarCitas/:idCita',  citasController.eliminarCitas);

module.exports = api; 