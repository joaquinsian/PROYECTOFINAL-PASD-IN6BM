'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PreguntaSchema = Schema({
    numero: Number,
    pregunta: String,
    imagen: String,
    respuesta: [{
        respuesta: String,
        valida: Boolean,
        puntaje: Number
    }],
    juego: {
        type: Schema.Types.ObjectId,
        ref: "juego"
    }
})

module.exports = mongoose.model('pregunta', PreguntaSchema);