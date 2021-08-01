'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: String,
    usuario: String,
    dpi: String,
    email: String,
    celular: String,
    password: String,
    foto: String,
    descripcion: String,
    rol: String
})

module.exports = mongoose.model('usuario', UsuarioSchema)