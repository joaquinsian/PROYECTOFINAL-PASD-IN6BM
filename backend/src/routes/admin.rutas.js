'use strict'
const express = require('express')
const adminController = require('../controller/admin.controller')
const md_autenticacion = require('../middlewares/authenticated')

var api = express.Router();
api.get('/usuarios', md_autenticacion.ensureAuth, adminController.usuarios)

module.exports = api;