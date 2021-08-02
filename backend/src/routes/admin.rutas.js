'use strict'
const express = require('express')
const adminController = require('../controller/admin.controller')
const md_autenticacion = require('../middlewares/authenticated')

var api = express.Router();
api.get('/usuarios', md_autenticacion.ensureAuth, adminController.todosUsuarios)
api.get('/obtenerUsuario/:idUsuario', md_autenticacion.ensureAuth, adminController.obtenerUsuarioId)
api.put('/editarUsuario/:idUsuario', md_autenticacion.ensureAuth, adminController.editarUsuario)
api.delete('/eliminarUsuario/:idUsuario', md_autenticacion.ensureAuth, adminController.eliminarUsuario)
api.get('/solicitudesPendientes', md_autenticacion.ensureAuth, adminController.solicitudPendiente)
api.get('/solicitudId/:idSolicitud', md_autenticacion.ensureAuth, adminController.solicitudId)
api.get('/aceptarSolicitud/:idSolicitud', adminController.aceptarSolicitud)
api.get('/rechazarSolicitud/:idSolicitud', md_autenticacion.ensureAuth, adminController.rechazarSolicitud)

module.exports = api;