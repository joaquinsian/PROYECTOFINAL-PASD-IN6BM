'use strict'

const modelojuego = require("../models/juego.model")
const Pregunta = require("../models/pregunta.model")
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


async function agregarPreguntas(req, res){
    var modelopregunta = new Pregunta ();
    var params = req.body;

    await Juego.findOne({nivel:facil}).exec((err, save)=>{
        if(err){
            return res.status(404).send({mensaje:"error"})
        }if (save){
            if(params.numero && params.pregunta && params.respuesta){
                modelopregunta.numero = params.numero;
                modelopregunta.pregunta = params.pregunta;
                modelopregunta.respuesta = params.respuesta;
               
                modelopregunta.save((err, guardado)=>{
                    if(err) 
                    return res.status(404).send({mensaje:"error alguardar la pregunta"});
                    if (guardado){
                        return res.status(200).send({guardado})
                    }
                   
                })

            }
        }
    })
}



module.exports = {
    crearJuego, 
    agregarPreguntas
}