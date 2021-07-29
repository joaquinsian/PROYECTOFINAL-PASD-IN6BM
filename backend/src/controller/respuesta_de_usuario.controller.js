const RespuestaDeUsuario = require("../models/respuesta_de_usuario.model");

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
    const { pregunta, respuesta, juego } = req.body;
    const nuevoJuego = new RespuestaDeUsuario({ pregunta, respuesta, juego });
    nuevoJuego.save()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function editarRespuestaDeUsuario(req, res) {
    const { pregunta, respuesta, juego } = req.body;
    await RespuestaDeUsuario.findByIdAndUpdate(req.params.id, { pregunta, respuesta, juego })
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