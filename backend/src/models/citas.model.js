'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const CitasSchema = Schema({
    usuario: {type: Schema.Types.ObjectId, ref: 'usuario'},
    doctor: {type: Schema.Types.ObjectId, ref: 'usuario'},
    fecha_cita: Date
});
 
module.exports = mongoose.model('citas', CitasSchema)  