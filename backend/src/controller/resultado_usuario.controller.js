const ResultadoUsuario = require("../models/respuesta_de_usuario.model");

async function obtenerResultadoUsuario(req, res) {
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
    obtenerResultadoUsuario,
    obtenerResultadoUsuarioPorId,
    crearResultadoUsuario,
    editarResultadoUsuario,
    eliminarResultadoUsuario
}