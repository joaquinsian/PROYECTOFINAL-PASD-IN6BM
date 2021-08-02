'use strict'

const express = require('express')
const md_autenticacion = require('../middlewares/authenticated')
const citasController = require('../controller/citas.controller')

//rutas
var api = express.Router();
api.post('/crearCitas', md_autenticacion.ensureAuth, citasController.crearCitas);
api.get('/obtenerCitas', md_autenticacion.ensureAuth,citasController.obtenerCitas);
api.get('/obtenerCitasID/:idCita', citasController.obtenerCitasID);
api.put('/editarCitas/:idCita', md_autenticacion.ensureAuth, citasController.editarCitas);
api.delete('/eliminarCitas/:idCita', md_autenticacion.ensureAuth ,citasController.eliminarCitas);
api.get('/misPacientes', md_autenticacion.ensureAuth, citasController.misPacientes)

module.exports = api; 