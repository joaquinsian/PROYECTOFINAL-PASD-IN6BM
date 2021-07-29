'use strict'

const express = require('express')
const infoController = require('../controller/informacion.controller')

var api = express.Router();

api.post('/agregarInformacion', infoController.agregarInformacion)
api.get('/obtenerInformacion', infoController.obtenerInformacion)

module.exports = api;