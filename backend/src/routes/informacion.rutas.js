'use strict'

const express = require('express')
const infoController = require('../controller/informacion.controller')

var api = express.Router();

api.post('/agregarInformacion', infoController.agregarInformacion);
api.get('/obtenerInformacion', infoController.obtenerInformacion);
api.get('/obtenerInformacionID/:idInfo', infoController.obtenerInformacionID);
api.put('/editarInformacion/:idInfo', infoController.editarInformacion);
api.delete('/eliminarInformacion/:idInfo', infoController.eliminarInformacion)

module.exports = api;