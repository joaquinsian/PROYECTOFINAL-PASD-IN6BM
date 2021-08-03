'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var informacionSchema = Schema({
    titulo: String,
    ImagenPrincipal: String,
    parrafos: String
}, {
    timestamps: true
})

module.exports = mongoose.model('informacion', informacionSchema) 