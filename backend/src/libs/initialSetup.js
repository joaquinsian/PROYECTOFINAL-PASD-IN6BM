'use strict'

const modelojuego = require("../models/juego.model")

async function crearJuego() {

    try {
        
        // VERIFICA SI YA EXISTEN LOS DATOS
        const count = await modelojuego.estimatedDocumentCount();

        if (count > 0) return;


        // GUARDAR DATOS
        const values = await Promise.all([
            new modelojuego({ nombre: "inicial", nivel: "inicial"}).save(),
            new modelojuego({ nombre: "Conociendome", nivel: "facil" }).save(),
            new modelojuego({ nombre: "Entendiendo", nivel: "medio" }).save(),
            new modelojuego({ nombre: "Realidad", nivel: "dificil" }).save(),
        ]);


        // MOSTRARLOS EN CONSOLA
        console.log(values);
    

       console.log("se crearon los niveles")
    } catch (e) {
        console.error(e);
    }
}


module.exports = { crearJuego }