const ResultadoUsuario = require("../models/resultado_usuario.model");
const RespuestaDeUsuario = require("../models/respuesta_de_usuario.model");
const Pregunta = require("../models/pregunta.model");
const Juego = require("../models/juego.model");
const jwt = require('jwt-simple');

async function obtenerResultadosUsuario(req, res) {
    await ResultadoUsuario.find().populate("juego").populate("usuario")
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
    let x = jwt.decode(req.headers["authorization"], "PASD");
    const idusuario = x.sub;
    const idpregunta = req.params.idpregunta;
    let preguntafinded = await Pregunta.findOne({ _id: idpregunta });
    let juegofinded = await Juego.findOne({ _id: preguntafinded.juego })

    if (preguntafinded.numero !== 10) {
        return res.status(400).json({ "error": "No ha finalizado o se saltó la preguntas" })
    }

    RespuestaDeUsuario.find({ usuario: idusuario, "respuesta.valido": true }).populate("respuesta.pregunta")
        .then(doc => {
            let counter = 0;
            doc.forEach(y => {
                if (String(y.respuesta.pregunta.juego) === String(juegofinded._id)) {
                    counter++;
                    console.log(y.respuesta.pregunta.juego)
                }
            });

            counter = counter * 10;
            const nuevoResultado = new ResultadoUsuario({ juego: preguntafinded.juego, usuario: idusuario, resultado: counter });
            nuevoResultado.save()
                .then(doc3 => res.json(doc3))
                .catch(err3 => console.error(err3));
        })
        .catch(err => console.error(err));
}

async function agregarEncuestaInicialAlFinalizarElJuego(req, res) {
    let x = jwt.decode(req.headers["authorization"], "PASD");
    let count = 0;
    let resultadofinal = 0;
    const idusuario = x.sub;
    const idpregunta = req.params.idpregunta;

    let preguntafinded = await Pregunta.findOne({ _id: idpregunta });
    let juegofinded = await Juego.findOne({ nivel: "inicial" });
    console.log(juegofinded._id)

    const test = await ResultadoUsuario.findOne({ juego: juegofinded._id, usuario: idusuario });
    if (test) return res.status(400).json({ error: "El usuario ya tiene una encuesta" })


    if (String(preguntafinded.juego) !== String(juegofinded._id)) return res.status(400).json({ error: "No es una encuesta" });

    const respuestafinded = await RespuestaDeUsuario.find({ usuario: idusuario }).populate("respuesta.pregunta");

    if (!respuestafinded) return res.status(400).json({ error: "El usuario no tiene encuesta completada" });
    respuestafinded.forEach(x => {
        if (String(x.respuesta.pregunta.juego) === String(juegofinded._id)) {
            resultadofinal = resultadofinal + x.respuesta.puntaje;
            count++;
        }
    });

    if (count === 10) {
        const newResultado = new ResultadoUsuario({ juego: juegofinded._id, usuario: idusuario, resultado: resultadofinal })
        newResultado.save()
            .then(doc => res.json(doc))
            .catch(err => console.error(err));
    } else {
        res.status(400).json({ error: "El usuario no ha terminado sus preguntas" })
    }

}

async function obtenerMisCalificaciones(req, res) {
    let x = jwt.decode(req.headers["authorization"], "PASD");
    const idusuario = x.sub;

    const myscores = await ResultadoUsuario.find({ usuario: idusuario }).populate("juego");

    res.json(myscores);
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
    obtenerMisCalificaciones,
    agregarEncuestaInicialAlFinalizarElJuego,
    crearResultadoUsuario,
    editarResultadoUsuario,
    eliminarResultadoUsuario,
}