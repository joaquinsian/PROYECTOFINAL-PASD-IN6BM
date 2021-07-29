const Juego = require("../models/juego.model");
const mongoose = require("mongoose");

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
    const { nombre, nivel } = req.body;
    const nuevoJuego = new Juego({ nombre, nivel });
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
    if (mongoose.Types.ObjectId(req.params.id) !== req.params.id) {
        return res.status(400).json({ "error": "El id ingresado no es válido" })
    }
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