'use strict'
const express = require('express')
const usuarioController= require('../controller/usuario.controller')
const md_autenticacion = require('../middlewares/authenticated')

//Rutas
var api = express.Router();
api.post('/registro', usuarioController.registro);
api.put('/editarUsuario/:idUsuario', md_autenticacion.ensureAuth, usuarioController.editarUsuario)
api.delete('/eliminarUsuario/:idUsuario', md_autenticacion.ensureAuth, usuarioController.eliminarUsuario)
api.get('/usuarioId/:idUsuario', usuarioController.usuarioId)
api.post('/enviarSolicitud', md_autenticacion.ensureAuth, usuarioController.solicitudDoctor)

module.exports = api;