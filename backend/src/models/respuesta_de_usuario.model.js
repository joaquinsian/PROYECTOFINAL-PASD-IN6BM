'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var RespuestaDeUsuarioSchema = Schema({
    pregunta: {
        type: Schema.Types.ObjectId,
        ref: "pregunta"
    },
    respuesta_que_ingreso_el_usuario: String,
    valido: Boolean
})

module.exports = mongoose.model('respuesta_de_usuario', RespuestaDeUsuarioSchema);