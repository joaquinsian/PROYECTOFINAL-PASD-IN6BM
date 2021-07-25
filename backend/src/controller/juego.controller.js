const Juego = require("../models/juego.model");

async function obtenerJuegos(req, res) {
    await Juego.find()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function obtenerJuegoPorId(req, res) {
    await Juego.findById(req.params.id)
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function crearJuego(req, res) {
    const { nivel } = req.body;
    const nuevoJuego = new Juego({ nivel });
    nuevoJuego.save()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function editarJuego(req, res) {
    const { nivel } = req.body;
    await Juego.findByIdAndUpdate(req.params.id, { nivel })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function eliminarJuego(req, res) {
    await Juego.findByIdAndDelete(req.params.id)
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

module.exports = {
    obtenerJuegos,
    obtenerJuegoPorId,
    crearJuego,
    editarJuego,
    eliminarJuego
}