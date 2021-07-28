'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ResultadoUsuarioSchema = Schema({
    juego: {
        type: Schema.Types.ObjectId,
        ref: "juego"
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuario"
    },
    resultado: Number
})

module.exports = mongoose.model('respuesta_de_usuario', ResultadoUsuarioSchema);