const Pregunta = require("../models/pregunta.model");
const Juego = require("../models/juego.model");

async function obtenerPreguntas(req, res) {
    await Pregunta.find()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function obtenerPreguntaPorId(req, res) {
    await Pregunta.findById(req.params.id)
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function obtenerPreguntasInicial(req, res) {
    const initialfinded = await Juego.findOne({ nivel: "inicial" });
    const { numero } = req.params;

    if (isNaN(numero)) return res.status(400).json({ error: "No es un numero" });

    Pregunta.findOne({ juego: initialfinded._id, numero })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function obtenerPreguntasNivel(req, res) {
    const { numero } = req.params;
    const initialfinded = await Juego.findOne({ _id: req.params.idjuego });
    if (isNaN(numero)) return res.status(400).json({ error: "No es un numero" });

    Pregunta.findOne({ juego: initialfinded._id, numero })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));

}

async function crearPregunta(req, res) {
    const { numero, pregunta, respuesta, juego } = req.body;
    const nuevoJuego = new Pregunta({ numero, pregunta, respuesta, juego });
    nuevoJuego.save()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function editarPregunta(req, res) {
    const { pregunta, respuesta, juego } = req.body;
    await Pregunta.findByIdAndUpdate(req.params.id, { pregunta, respuesta, juego })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

async function eliminarPregunta(req, res) {
    await Pregunta.findByIdAndDelete(req.params.id)
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

module.exports = {
    obtenerPreguntas,
    obtenerPreguntasInicial,
    obtenerPreguntaPorId,
    obtenerPreguntasNivel,
    crearPregunta,
    editarPregunta,
    eliminarPregunta
}