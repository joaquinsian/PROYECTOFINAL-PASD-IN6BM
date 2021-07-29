'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var informacionSchema = Schema({
    titulo: String,
    contenido: String,
    ImagenPrincipal: String
})

module.exports = mongoose.model('informacion', informacionSchema) 