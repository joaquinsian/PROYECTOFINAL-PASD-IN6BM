'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ChatSchema = Schema({
    usuarioa: {
        type: Schema.Types.ObjectId,
        ref: "usuario"
    },
    usuarioab: {
        type: Schema.Types.ObjectId,
        ref: "usuario"
    },
    mensajes: [{
        emisor: {
            type: Schema.Types.ObjectId,
            ref: "usuario"
        },
        mensaje: ""
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('chat', ChatSchema)