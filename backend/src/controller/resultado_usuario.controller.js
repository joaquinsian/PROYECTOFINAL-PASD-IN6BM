const ResultadoUsuario = require("../models/resultado_usuario.model");
const RespuestaDeUsuario = require("../models/respuesta_de_usuario.model");

async function obtenerResultadosUsuario(req, res) {
    await ResultadoUsuario.find()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function obtenerResultadoUsuarioPorId(req, res) {
    await ResultadoUsuario.findById(req.params.id)
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function crearResultadoUsuario(req, res) {
    const { juego, usuario, resultado } = req.body;
    const nuevoJuego = new ResultadoUsuario({ juego, usuario, resultado });
    nuevoJuego.save()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function agregarResultadoAlFinalizarElJuego(req, res) {
    const idusuario = req.params.id;
    await RespuestaDeUsuario.find({ usuario: idusuario })
        .then(doc => {
            if (doc.length === 10) {
                RespuestaDeUsuario.find({ usuario: idusuario, "respuesta.valido": true })
                    .then(doc2 => {
                        res.json(doc2.length)
                    })
                    .catch(err2 => console.error(err2));
            } else {
                res.status(400).json({ error: "No ha respondido todas las preguntas" })
            }
        })
        .catch(err => console.error(err));
}

async function editarResultadoUsuario(req, res) {
    const { juego, usuario, resultado } = req.body;
    await ResultadoUsuario.findByIdAndUpdate(req.params.id, { juego, usuario, resultado })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function eliminarResultadoUsuario(req, res) {
    await ResultadoUsuario.findByIdAndDelete(req.params.id)
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

module.exports = {
    obtenerResultadosUsuario,
    obtenerResultadoUsuarioPorId,
    agregarResultadoAlFinalizarElJuego,
    crearResultadoUsuario,
    editarResultadoUsuario,
    eliminarResultadoUsuario,
}