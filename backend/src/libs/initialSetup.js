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
            new modelojuego({ nombre: "inicial", nivel: "inicial" }).save(),
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


async function agregarPreguntas() {
    // VERIFICA SI YA EXISTEN LOS DATOS
    const count = await Pregunta.estimatedDocumentCount();

    if (count > 0) return;
    let contador = 0;

    // OBTENER ID DE JUEGO (podes usar console.log(inicial) si tenes dudas)
    const idinicial = await modelojuego.findOne({ nivel: "inicial" });

    const idfacil = await modelojuego.findOne({ nivel: "facil" });

    const idmedio = await modelojuego.findOne({ nivel: "medio" });

    const iddificil = await modelojuego.findOne({ nivel: "dificil" });

    // GUARDAR DATOS
    const values = await Promise.all([
        new Pregunta({
            numero: 1,
            pregunta: "¿Cada cuánto tiempo te drogas?",
            imagen: "https://img.freepik.com/foto-gratis/concepto-adiccion-drogas-paquete-heroina-jeringa-sobre-fondo-negro_260672-2317.jpg?size=626&ext=jpg",
            respuesta: [{
                respuesta: "Cada semana",
                puntaje: 5
            }, {
                respuesta: "Frecuentemente",
                puntaje: 7
            }, {
                respuesta: "Siempre",
                puntaje: 10
            }],
            juego: idinicial._id // AQUI USO EL ID DE INICIAL QUE OBTUVE EN LINEA 40
        }).save(),
        new Pregunta({
            numero: 2,
            pregunta: "¿Qué drogas consumes más?",
            imagen: "https://www.eluniverso.com/resizer/jeFtDsxYwYhRctaM4VEti_rt2Yg=/1191x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/DKC6JSIT5JCAPBS2CV2P7H7EZY.jpg",
            respuesta: [{
                respuesta: "Heroína",
                puntaje: 10
            }, {
                respuesta: "Cocaína",
                puntaje: 9
            }, {
                respuesta: "Nicotina",
                puntaje: 7
            }, {
                respuesta: "Otros",
                puntaje: 6
            }],
            juego: idinicial._id // AQUI USO EL ID DE INICIAL QUE OBTUVE EN LINEA 40
        }).save(),

        new Pregunta({
            numero: 3,
            pregunta: "¿Cuánto tiempo llevas drogándote?",
            imagen: "https://www.eluniverso.com/resizer/jeFtDsxYwYhRctaM4VEti_rt2Yg=/1191x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/DKC6JSIT5JCAPBS2CV2P7H7EZY.jpg",
            respuesta: [{
                respuesta: "De 1 a 5 años",
                puntaje: 7
            }, {
                respuesta: "5 a 10 años",
                puntaje: 9
            }, {
                respuesta: "Más de 10 años",
                puntaje: 10
            }],
            juego: idinicial._id // AQUI USO EL ID DE INICIAL QUE OBTUVE EN LINEA 40
        }).save(),

        new Pregunta({
            numero: 4,
            pregunta: "¿A qué edad te comenzaste a drogar?",
            imagen: "https://redcomunica.csuca.org/index.php/assets/universidad-de-san-carlos-de-guatemala-usac/blog/4750/drogas-joven-1.jpg",
            respuesta: [{
                respuesta: "De 0 a 10 años",
                puntaje: 10
            }, {
                respuesta: "10 a 20 años",
                puntaje: 9
            }, {
                respuesta: "Más de 20 años",
                puntaje: 7
            }],
            juego: idinicial._id // AQUI USO EL ID DE INICIAL QUE OBTUVE EN LINEA 40
        }).save(),

        new Pregunta({
            numero: 5,
            pregunta: "¿Cómo te drogas?",
            imagen: "https://redcomunica.csuca.org/index.php/assets/universidad-de-san-carlos-de-guatemala-usac/blog/4750/drogas-joven-1.jpg",
            respuesta: [{
                respuesta: "Lo fumo",
                puntaje: 7
            }, {
                respuesta: "Lo inhalo",
                puntaje: 9
            }, {
                respuesta: "Me inyecto",
                puntaje: 10
            }],
            juego: idinicial._id // AQUI USO EL ID DE INICIAL QUE OBTUVE EN LINEA 40
        }).save(),

        new Pregunta({
            numero: 6,
            pregunta: "¿Con qué dinero compras las drogas?",
            imagen: "https://www.fundacionmapfre.org/media/educacion-divulgacion/seguridad-vial/movilidad-segura-salud/temas-clinicos-conduccion-segura/medicamentos-alcohol-drogas/tipos-drogas-medicamentos-alcohol-drogas-1200x600-1.jpg",
            respuesta: [{
                respuesta: "Con el de mi trabajo",
                puntaje: 10
            }, {
                respuesta: "Pido prestado",
                puntaje: 9
            }, {
                respuesta: "Robo para comprar",
                puntaje: 7
            }],
            juego: idinicial._id // AQUI USO EL ID DE INICIAL QUE OBTUVE EN LINEA 40
        }).save(),

        new Pregunta({
            numero: 7,
            pregunta: "¿Por qué te quieres dejar de drogar?",
            imagen: "https://www.fundacionmapfre.org/media/educacion-divulgacion/seguridad-vial/movilidad-segura-salud/temas-clinicos-conduccion-segura/medicamentos-alcohol-drogas/tipos-drogas-medicamentos-alcohol-drogas-1200x600-1.jpg",
            respuesta: [{
                respuesta: "Por mi familia",
                puntaje: 7
            }, {
                respuesta: "Para no terminar mal",
                puntaje: 5
            }, {
                respuesta: "Me están obligando",
                puntaje: 10
            }, {
                respuesta: "Para no afectar a los demás",
                puntaje: 9
            }],
            juego: idinicial._id // AQUI USO EL ID DE INICIAL QUE OBTUVE EN LINEA 40
        }).save(),

        new Pregunta({
            numero: 8,
            pregunta: "¿Por qué te drogas?",
            imagen: "https://diarioley.com/wp-content/uploads/2017/12/adicciones-custodia-compartida.png",
            respuesta: [{
                respuesta: "Para escapar de mis problemas",
                puntaje: 10
            }, {
                respuesta: "Para sentirme bien o placer",
                puntaje: 9
            }, {
                respuesta: "Me ayuda a desempeñarme mejor",
                puntaje: 7
            }, {
                respuesta: "Para relajarme",
                puntaje: 6
            }],
            juego: idinicial._id // AQUI USO EL ID DE INICIAL QUE OBTUVE EN LINEA 40
        }).save(),

        new Pregunta({
            numero: 9,
            pregunta: "¿Hablas con tu familia?",
            imagen: "https://diarioley.com/wp-content/uploads/2017/12/adicciones-custodia-compartida.png",
            respuesta: [{
                respuesta: "Siempre",
                puntaje: 6
            }, {
                respuesta: "A veces",
                puntaje: 8
            }, {
                respuesta: "Nunca",
                puntaje: 10
            }],
            juego: idinicial._id // AQUI USO EL ID DE INICIAL QUE OBTUVE EN LINEA 40
        }).save(),

        new Pregunta({
            numero: 10,
            pregunta: "¿Tienes problemas sociales con alguien?",
            imagen: "https://remulsa.es/contenido/u/2020/11/consumo-menores-1140x641.jpg",
            respuesta: [{
                respuesta: "Con amigos o conocidos",
                puntaje: 7
            }, {
                respuesta: "Con familia",
                puntaje: 7
            }, {
                respuesta: "Ambas",
                puntaje: 10
            }, {
                respuesta: "Ninguna de las anteriores",
                puntaje: 5
            }],
            juego: idinicial._id // AQUI USO EL ID DE INICIAL QUE OBTUVE EN LINEA 40
        }).save(),
    ]);


    // MOSTRARLOS EN CONSOLA
    console.log(values);
}

module.exports = {
    crearJuego,
    agregarPreguntas
}