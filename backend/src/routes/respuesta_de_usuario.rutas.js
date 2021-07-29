'use strict'
const express = require('express');
const respuesta_de_usuarioController = require('../controller/respuesta_de_usuario.controller');
const md_autenticacion = require('../middlewares/authenticated');

//Rutas
var api = express.Router();
api.get('/respuesta_de_usuario', respuesta_de_usuarioController.obtenerRespuestasDeUsuario);
api.get('/respuesta_de_usuario/:id', respuesta_de_usuarioController.obtenerRespuestaDeUsuarioPorId);
api.post('/respuesta_de_usuario', respuesta_de_usuarioController.crearRespuestaDeUsuario);
api.put('/respuesta_de_usuario/:id', respuesta_de_usuarioController.editarRespuestaDeUsuario);
api.delete('/respuesta_de_usuario/:id', respuesta_de_usuarioController.eliminarRespuestaDeUsuario);

module.exports = api;