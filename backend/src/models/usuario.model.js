'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: String,
    usuario: String,
    dpi: String,
    password: String,
    rol: String
})

module.exports = mongoose.model('usuario', UsuarioSchema)