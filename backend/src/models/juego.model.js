'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var JuegoSchema = Schema({
    nivel: String
})

module.exports = mongoose.model('juego', JuegoSchema)