const Juego = require("../models/juego.model");
const ResultadoUsuario = require("../models/resultado_usuario.model");
const mongoose = require("mongoose");
const jwt = require('jwt-simple');

async function obtenerJuegos(req, res) {
    await Juego.find()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function verificarEncuestaPorUsuario(req, res) {
    let x = jwt.decode(req.headers["authorization"], "PASD");
    const juegofinded = await Juego.findOne({ nivel: "inicial" });

    const resultfound = await ResultadoUsuario.findOne({ usuario: x.sub, juego: juegofinded._id });

    if (resultfound) {
        res.json({ "message": "El usuario tiene una encuesta" });
    } else {
        res.status(200).json({ message: "El usuario no tiene encuesta" });
    }

}

async function verificarJuegosPorUsuario(req, res) {
    let x = jwt.decode(req.headers["authorization"], "PASD");
    const juegofinded = await Juego.findOne({ nivel: "inicial" });

    const resultfound = await ResultadoUsuario.findOne({ usuario: x.sub, juego: juegofinded._id });

    if (!resultfound) return res.status(400).json({ error: "El usuario no ha realizado su encuesta" });

    if (resultfound.resultado < 80) {
        console.log("El resultado es pequeño");
        await Juego.find({ $or: [{ nivel: "facil" }] })
            .then(doc => {
                res.json(doc)
            })
            .catch(err => console.error(err));

    } else if (resultfound.resultado < 90) {
        console.log("El resultado es mediano");
        await Juego.find({ $or: [{ nivel: "facil" }, { nivel: "medio" }] })
            .then(doc => {
                res.json(doc)
            })
            .catch(err => console.error(err));

    } else {
        console.log("El resultado es grande");
        await Juego.find({ $or: [{ nivel: "facil" }, { nivel: "medio" }, { nivel: "dificil" }] })
            .then(doc => {
                res.json(doc)
            })
            .catch(err => console.error(err));
    }

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
    verificarEncuestaPorUsuario,
    verificarJuegosPorUsuario,
    crearJuego,
    editarJuego,
    eliminarJuego
}