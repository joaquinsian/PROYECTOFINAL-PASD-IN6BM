'use strict'
const express = require('express')
const adminController = require('../controller/admin.controller')
const md_autenticacion = require('../middlewares/authenticated')

var api = express.Router();
api.get('/usuarios', md_autenticacion.ensureAuth, adminController.usuariosPacientes)
api.get('/obtenerUsuario/:idUsuario', md_autenticacion.ensureAuth, adminController.obtenerUsuarioId)
api.put('/editarUsuario/:idUsuario', md_autenticacion.ensureAuth, adminController.editarUsuario)
api.delete('/eliminarUsuario/:idUsuario', md_autenticacion.ensureAuth, adminController.eliminarUsuario)

module.exports = api;