'use strict'
const express = require('express')
const juegoController = require('../controller/juego.controller')
const md_autenticacion = require('../middlewares/authenticated')

//Rutas
var api = express.Router();
api.get('/juego', juegoController.obtenerJuegos);
api.get('/juego/:id', juegoController.obtenerJuegoPorId);
api.get("/verificarencuesta", juegoController.verificarEncuestaPorUsuario);
api.get("/verificarjuegos", juegoController.verificarJuegosPorUsuario);
api.post('/juego', juegoController.crearJuego);
api.put('/juego/:id', juegoController.editarJuego);
api.delete('/juego/:id', juegoController.eliminarJuego);

module.exports = api;