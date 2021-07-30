'use strict';
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Rel_Doc_UserSchema = Schema({
    doctor: {type: Schema.Types.ObjectId, ref: 'usuario'},
    usuario: {type: Schema.Types.ObjectId, ref: 'usuario'},
    progreso: Number
})

module.exports = mongoose.model('rel_doc_user', Rel_Doc_UserSchema)