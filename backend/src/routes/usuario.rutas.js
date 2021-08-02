'use strict'
const express = require('express')
const usuarioController = require('../controller/usuario.controller')
const md_autenticacion = require('../middlewares/authenticated')

//Rutas
var api = express.Router();
api.get('/obtenerusuarios', usuarioController.obtenerUsuarios);
api.post('/registro', usuarioController.registro);
api.put('/editarUsuario/:idUsuario', md_autenticacion.ensureAuth, usuarioController.editarUsuario)
api.delete('/eliminarUsuario/:idUsuario', md_autenticacion.ensureAuth, usuarioController.eliminarUsuario)
api.get('/usuarioId', usuarioController.usuarioId)
api.post('/enviarSolicitud', md_autenticacion.ensureAuth, usuarioController.solicitudDoctor)
api.get('/doctores', usuarioController.doctores)
api.post('/elegirDoctor', md_autenticacion.ensureAuth, usuarioController.elegirDoctor);
api.delete('/eliminarMiDoctor', md_autenticacion.ensureAuth, usuarioController.eliminarMiDoctor)
api.get("/obtenerIdentidad", usuarioController.obtenerIdentidad)
api.get("/obtenerDoctor",md_autenticacion.ensureAuth,usuarioController.obtenerDoctor)
api.get("/relDoc", md_autenticacion.ensureAuth, usuarioController.relDoc)
api.get('/doctoresDetalle', usuarioController.doctoresDetalle)

module.exports = api;