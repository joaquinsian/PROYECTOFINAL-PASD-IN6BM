'use strict'
const mongoose = require('mongoose')
const app = require('./app')
const adminController = require('./src/controller/admin.controller')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://u8bsudrljfhbawnh3ikc:JJ0nZ2I0d1ekYja6wjgQ@bqulrrsnavpkw3q-mongodb.services.clever-cloud.com:27017/bqulrrsnavpkw3q', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(() => {
    console.log("Se encuentra conectado a la base de datos");

    crearAdmin();

    app.listen(3000, function() {
        console.log("Está funcionando en el puerto 3000");
    })
}).catch(err => console.log(err))

//Administrador por default
const crearAdmin = () => {
    adminController.adminDefault("PASD", "pasd", "pasd", "pasd@gmail.com", "41968661", "123", "https://southcentralus1-mediap.svc.ms/transform/thumbnail?provider=spo&inputFormat=png&cs=fFNQTw&docid=https%3A%2F%2Fcetkinal-my.sharepoint.com%3A443%2F_api%2Fv2.0%2Fdrives%2Fb!kr4oWcYrgEeJFjOeT8DBq_JIcFVrJJpGoZmuyS83uGyxVb5Pm5wUT78pDZIgCsfq%2Fitems%2F01J7CS45DZLQ7BGJUUTZCKWTRMLBRHKNNI%3Fversion%3DPublished&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2V0a2luYWwtbXkuc2hhcmVwb2ludC5jb21ANTU0NWI0OGYtYjIyZi00YmJiLWJiYTUtN2Y1MDQwNjY3MTgwIiwiaXNzIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwIiwibmJmIjoiMTYyNzgxOTIwMCIsImV4cCI6IjE2Mjc4NDA4MDAiLCJlbmRwb2ludHVybCI6InQ5NXhjeGpJWkxpb1VzQmgwUmtMd0x6NjR2T2xqbkI3c05Ra0F3TG84TUU9IiwiZW5kcG9pbnR1cmxMZW5ndGgiOiIxMTgiLCJpc2xvb3BiYWNrIjoiVHJ1ZSIsInZlciI6Imhhc2hlZHByb29mdG9rZW4iLCJzaXRlaWQiOiJOVGt5T0dKbE9USXRNbUpqTmkwME56Z3dMVGc1TVRZdE16TTVaVFJtWXpCak1XRmkiLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwibmFtZWlkIjoiMCMuZnxtZW1iZXJzaGlwfGptb3JhdGF5YS0yMDE5MDQxQGtpbmFsLmVkdS5ndCIsIm5paSI6Im1pY3Jvc29mdC5zaGFyZXBvaW50IiwiaXN1c2VyIjoidHJ1ZSIsImNhY2hla2V5IjoiMGguZnxtZW1iZXJzaGlwfDEwMDMyMDAwMzZmMzk2N2ZAbGl2ZS5jb20iLCJ0dCI6IjAiLCJ1c2VQZXJzaXN0ZW50Q29va2llIjoiMyJ9.VTQ2Si8yU0JoeU1waENGaXRDMk80NGU1YmU1SUd3QlRmd3ZuYTZ2bStHZz0&encodeFailures=1&width=1440&height=717&srcWidth=&srcHeight=", "Queremos lograr una mejor vida, pero primero tienen que tener una muy buena rehabilitación", "Admin");
}