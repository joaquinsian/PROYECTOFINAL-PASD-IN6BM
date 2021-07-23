'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var CitasSchema = Schema({
    usuario: String,
    doctor: String,
    fecha_de_cita: Date
})

module.exports = mongoose.model('citas', CitasSchema)