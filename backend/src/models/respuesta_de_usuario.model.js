'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var RespuestaDeUsuarioSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuario"
    },
    respuesta: {
        pregunta: {
            type: Schema.Types.ObjectId,
            ref: "pregunta"
        },
        respuesta: String,
        valido: Boolean,
        puntaje: Number
    },
});

module.exports = mongoose.model('respuesta_de_usuario', RespuestaDeUsuarioSchema);