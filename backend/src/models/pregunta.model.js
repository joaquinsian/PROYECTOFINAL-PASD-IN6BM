'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PreguntaSchema = Schema({
    numero: Number,
    pregunta: String,
    respuesta: [{
        type: String
    }],
    juego: {
        type: Schema.Types.ObjectId,
        ref: "juego"
    }
})

module.exports = mongoose.model('pregunta', PreguntaSchema);