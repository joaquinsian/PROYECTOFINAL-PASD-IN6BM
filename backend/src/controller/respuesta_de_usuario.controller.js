const RespuestaDeUsuario = require("../models/respuesta_de_usuario.model");
const Pregunta = require("../models/pregunta.model");
const Juego = require("../models/juego.model")

async function obtenerRespuestasDeUsuario(req, res) {
    await RespuestaDeUsuario.find()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function obtenerRespuestaDeUsuarioPorId(req, res) {
    await RespuestaDeUsuario.findById(req.params.id)
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function crearRespuestaDeUsuario(req, res) {
    const { usuario, respuesta } = req.body;

    const preguntafinded = await Pregunta.findOne({ _id: respuesta.pregunta });

    /*
    const hasresponse = await RespuestaDeUsuario.find({ usuario, "respuesta.pregunta": respuesta.pregunta });
    if (hasresponse) return res.status(400).json({error: "El usuario tiene una respuesta"});
    */

    let encuestafinded = await Juego.findOne({ nivel: "inicial" });

    if (String(preguntafinded.juego) === String(encuestafinded._id)) {
        var nuevoJuego = new RespuestaDeUsuario();
        preguntafinded.respuesta.forEach(x => {
            if (x.respuesta == respuesta.respuesta) {
                nuevoJuego = new RespuestaDeUsuario({ usuario, respuesta: { pregunta: respuesta.pregunta, respuesta: respuesta.respuesta, puntaje: x.puntaje } });
            }
        });

        nuevoJuego.save()
            .then(doc => {
                res.json(doc)
            })
            .catch(err => console.error(err));
    } else {
        var validator = false;
        preguntafinded.respuesta.forEach(x => {
            if (x.valida === true) {
                if (x.respuesta == respuesta.respuesta) {
                    console.log("Es true")
                    validator = true;
                }
            }
        })
        const nuevoJuego = new RespuestaDeUsuario({ usuario, respuesta: { pregunta: respuesta.pregunta, respuesta: respuesta.respuesta, valido: validator } });
        nuevoJuego.save()
            .then(doc => {
                res.json(doc)
            })
            .catch(err => console.error(err));
    }
}

async function editarRespuestaDeUsuario(req, res) {
    const { usuario, respuesta, valido } = req.body;
    await RespuestaDeUsuario.findByIdAndUpdate(req.params.id, { usuario, respuesta, valido })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function eliminarRespuestaDeUsuario(req, res) {
    await RespuestaDeUsuario.findByIdAndDelete(req.params.id)
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

module.exports = {
    obtenerRespuestasDeUsuario,
    obtenerRespuestaDeUsuarioPorId,
    crearRespuestaDeUsuario,
    editarRespuestaDeUsuario,
    eliminarRespuestaDeUsuario
}