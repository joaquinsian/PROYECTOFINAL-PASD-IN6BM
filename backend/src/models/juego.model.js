'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var JuegoSchema = Schema({
    nombre: String,
    nivel: String
})

module.exports = mongoose.model('juego', JuegoSchema)