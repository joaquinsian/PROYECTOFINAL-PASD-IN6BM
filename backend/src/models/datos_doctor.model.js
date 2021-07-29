'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Datos_DoctorSchema = Schema({
    foto: String,
    hospital: String,
    especialidad: String,
    solicitud: Boolean,
    usuario: {type: Schema.Types.ObjectId, ref: 'usuario'}
})

module.exports = mongoose.model('datos_doctor', Datos_DoctorSchema)