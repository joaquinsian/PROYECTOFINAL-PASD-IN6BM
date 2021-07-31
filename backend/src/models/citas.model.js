'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CitasSchema = Schema({
    usuario: {type:Schema.Types.ObjectId, ref: 'usuario'},
    doctor: {type:Schema.Types.ObjectId, ref: 'datos_doctor'},
    fecha_de_cita: Date
})

module.exports = mongoose.model('citas', CitasSchema)  