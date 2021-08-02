'use strict'
const express = require('express')
const preguntaController = require('../controller/pregunta.controller')
const md_autenticacion = require('../middlewares/authenticated')

//Rutas
var api = express.Router();
api.get('/pregunta', preguntaController.obtenerPreguntas);
api.get('/pregunta/:id', preguntaController.obtenerPreguntaPorId);
api.get("/preguntainicial/:numero", preguntaController.obtenerPreguntasInicial);
api.get("/preguntanivel/:idjuego/:numero", preguntaController.obtenerPreguntasNivel);

api.post('/pregunta', preguntaController.crearPregunta);

api.put('/pregunta/:id', preguntaController.editarPregunta);

api.delete('/pregunta/:id', preguntaController.eliminarPregunta);

module.exports = api;