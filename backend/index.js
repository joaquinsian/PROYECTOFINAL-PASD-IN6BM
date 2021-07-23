'use strict'
const mongoose = require('mongoose')
const app = require('./app')
const adminController = require('./src/controller/admin.controller')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://u8bsudrljfhbawnh3ikc:JJ0nZ2I0d1ekYja6wjgQ@bqulrrsnavpkw3q-mongodb.services.clever-cloud.com:27017/bqulrrsnavpkw3q', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log("Se encuentra conectado a la base de datos");

    crearAdmin();

    app.listen(3000, function(){
        console.log("Está funcionando en el puerto 3000");
    })
}).catch(err => console.log(err))

//Administrador por default
const crearAdmin = () => {
    adminController.adminDefault("PASD", "pasd", "pasd", "pasd@gmail.com", "41968661", "123", "Admin");
} 