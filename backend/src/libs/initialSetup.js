'use strict'
const modelojuego = require("../models/juego.model")
const Pregunta = require("../models/pregunta.model");
const Info = require("../models/informacion.model")

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

        // ########################################################################

        new Pregunta({
            numero: 1,
            pregunta: "¿Las drogas se clasifican en legales (alcohol y tabaco) e ilegales (mariguana, cocaína, heroína, metanfetaminas, etcétera)?",
            imagen: "https://www.ardurecoverycenter.com/wp-content/uploads/2020/09/Drugs_-Types-of-Illegal-Drugs.png",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idfacil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 2,
            pregunta: "¿La droga es una sustancia o mezcla de sustancias, necesarias para el mantenimiento de la vida?",
            imagen: "https://ichef.bbci.co.uk/news/976/cpsprodpb/3B90/production/_118684251_gettyimages-538870696.jpg",
            respuesta: [{
                respuesta: "Verdadero",
                valida: false
            }, {
                respuesta: "Falso",
                valida: true
            }],
            juego: idfacil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 3,
            pregunta: "La farmacodependencia o drogadicción es la relación que se establece con una sustancia tóxica, la cual puede provocar cambios en el organismo, afectando la salud, las relaciones con la familia, con los amigos, en la escuela, en el trabajo, etcétera.",
            imagen: "https://www.ardurecoverycenter.com/wp-content/uploads/2020/09/Drugs_-Types-of-Illegal-Drugs.png",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idfacil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 4,
            pregunta: "¿Los efectos que causa una droga a nuestro organismo varían en función de la clase de sustancia de la que se trate?",
            imagen: "https://www.simcoemuskokahealth.org/images/default-source/homeslider/istock-174825736-webbanner.jpg?sfvrsn=2",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idfacil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 5,
            pregunta: "¿Una mujer embarazada que consume drogas no puede dañar a su hijo?",
            imagen: "http://www.anthonylouiscenter.com/wp-content/uploads/2015/04/Commonly-Abused-Drugs.jpg",
            respuesta: [{
                respuesta: "Verdadero",
                valida: false
            }, {
                respuesta: "Falso",
                valida: true
            }],
            juego: idfacil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 6,
            pregunta: "¿Las drogas alivian el estrés y ayudan a soportar los problemas?",
            imagen: "https://www.ardurecoverycenter.com/wp-content/uploads/2020/09/Drugs_-Types-of-Illegal-Drugs.png",
            respuesta: [{
                respuesta: "Verdadero",
                valida: false
            }, {
                respuesta: "Falso",
                valida: true
            }],
            juego: idfacil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 7,
            pregunta: "¿Los efectos de la mariguana desaparecen después de unas cuantas horas?",
            imagen: "https://ichef.bbci.co.uk/news/976/cpsprodpb/1E5C/production/_107427770_hi053578994.jpg",
            respuesta: [{
                respuesta: "Verdadero",
                valida: false
            }, {
                respuesta: "Falso",
                valida: true
            }],
            juego: idfacil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 8,
            pregunta: "¿El alcohol y el tabaco se consideran drogas?",
            imagen: "https://www.ardurecoverycenter.com/wp-content/uploads/2020/09/Drugs_-Types-of-Illegal-Drugs.png",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idfacil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 9,
            pregunta: "¿El consumo de alcohol y tabaco en un adolescente, incrementa el riesgo de usar otras drogas?",
            imagen: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/04/GettyImages-1301603007_header-1024x575.jpg?w=1155&h=1528",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idfacil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 10,
            pregunta: "¿La marihuana se puede utilizar con fines médicos?",
            imagen: "https://p0.pikrepo.com/preview/600/292/oval-white-pills-thumbnail.jpg",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idfacil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        // #######################################################################

        new Pregunta({
            numero: 1,
            pregunta: "¿El consumo de drogas es provocado por factores genéticos o hereditarios?",
            imagen: "https://www.phoenixprogrammes.com/images/4.jpg",
            respuesta: [{
                respuesta: "Verdadero",
                valida: false
            }, {
                respuesta: "Falso",
                valida: true
            }],
            juego: idmedio._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 2,
            pregunta: "Las causas que propician el consumo de drogas obedecen a ciertos factores, como la creencia de que la droga no le hace daño, la presión de los amigos; la curiosidad, la suposición de que las drogas pueden ayudarlos a olvidar sus problemas o a calmar su angustia, ansiedad o dolor. ",
            imagen: "https://www.ardurecoverycenter.com/wp-content/uploads/2020/09/Drugs_-Types-of-Illegal-Drugs.png",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idmedio._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 3,
            pregunta: "Las drogas alucinógenos son Sustancias que, al igual que los depresores, actúan directamente sobre el sistema nervioso central, pero de otra manera, ya que generan diferentes reacciones del cuerpo, como aumento en la presión sanguínea, en la temperatura corporal y el ritmo cardiaco; asimismo, euforia, sensación de bienestar, sentimiento exagerado de felicidad, ansiedad, disminución del apetito, estados de pánico, miedo, indiferencia al dolor y fatiga, alteraciones del sueño, comportamiento violento, sentimiento de mayor resistencia física, entre otras.",
            imagen: "https://www.simcoemuskokahealth.org/images/default-source/homeslider/istock-174825736-webbanner.jpg?sfvrsn=2",
            respuesta: [{
                respuesta: "Verdadero",
                valida: false
            }, {
                respuesta: "Falso",
                valida: true
            }],
            juego: idmedio._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 4,
            pregunta: "Las drogas depresoras éstos son, el funcionamiento del sistema nervioso central disminuye, provocando descontrol motor y del lenguaje, fallas en la percepción, lo que origina que los consumidores de estas drogas se tropiecen, caigan, permanezcan mucho tiempo sentados o acostados; hablen lentamente y se queden dormidos, ya que generalmente el abuso de sustancias depresoras termina en episodios de sueño profundo o de inactividad.",
            imagen: "http://www.anthonylouiscenter.com/wp-content/uploads/2015/04/Commonly-Abused-Drugs.jpg",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idmedio._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 5,
            pregunta: "¿Si se compra la droga a vendedores conocidos, se asegura su pureza?",
            imagen: "https://www.news-medical.net/image.axd?picture=2021%2F1%2Fshutterstock_544348294.jpg",
            respuesta: [{
                respuesta: "Verdadero",
                valida: false
            }, {
                respuesta: "Falso",
                valida: true
            }],
            juego: idmedio._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 6,
            pregunta: "Las drogas estimulantes son El LSD, la mezcalina y el peyote, constituyen las tres drogas alucinógenas más importantes que producen trastornos en la percepción; es decir, son sustancias que hacen que el usuario perciba objetos o sensaciones que no existen en la realidad",
            imagen: "https://previews.123rf.com/images/nanastudio/nanastudio1912/nanastudio191200316/135632399-hard-drugs-on-dark-table-drug-syringe-and-cooked-heroin.jpg",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idmedio._id // ANDATE ALV SIAN IMBECIL INUTILTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 7,
            pregunta: "La drogadicción es ante todo, una enfermedad y, adicionalmente, un problema social; lo primero porque afecta directamente la salud física y mental de las personas, al generar daños orgánicos, empeorar la calidad de vida, limitar el desarrollo de metas personales y profesionales, etcétera.",
            imagen: "https://ichef.bbci.co.uk/news/976/cpsprodpb/1E5C/production/_107427770_hi053578994.jpg",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idmedio._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 8,
            pregunta: "Si en las familias alguno o ambos padres son alcohólicos, fumadores o consumen alguna otra droga, los hijos aprenden de su ejemplo, considerando o dando por hecho que son conductas adecuadas y normales.",
            imagen: "https://p0.pikrepo.com/preview/600/292/oval-white-pills-thumbnail.jpg",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idmedio._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 9,
            pregunta: "Los golpes e insultos a los niños y adolescentes provocan que huyan de sus hogares, los que los pone en una situación con muy pocos o nulos apoyos para rechazar el consumo de alcohol y otras drogas.",
            imagen: "https://p0.pikrepo.com/preview/600/292/oval-white-pills-thumbnail.jpg",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idmedio._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 10,
            pregunta: "¿La violencia familiar representa un riesgo por abusar de drogas? ",
            imagen: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/04/GettyImages-1301603007_header-1024x575.jpg?w=1155&h=1528",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: idmedio._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),


        // #####################################################################

        new Pregunta({
            numero: 1,
            pregunta: "¿Es la pobreza un factor de riesgo para el consumo de drogas?",
            imagen: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/04/GettyImages-1301603007_header-1024x575.jpg?w=1155&h=1528",
            respuesta: [{
                respuesta: "Verdadero",
                valida: false
            }, {
                respuesta: "Falso",
                valida: true
            }],
            juego: iddificil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 2,
            pregunta: "¿La manera de vestir, hablar y escuchar música de un adolescente, se relacionan con el consumo de drogas?",
            imagen: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/04/GettyImages-1301603007_header-1024x575.jpg?w=1155&h=1528",
            respuesta: [{
                respuesta: "Verdadero",
                valida: false
            }, {
                respuesta: "Falso",
                valida: true
            }],
            juego: iddificil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 3,
            pregunta: " ¿Existe relación entre el trastorno por déficit de atención e hiperactividad (TDAH) y el consumo de drogas?",
            imagen: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/04/GettyImages-1301603007_header-1024x575.jpg?w=1155&h=1528",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: iddificil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 4,
            pregunta: "El TDAH se caracteriza porque el niño se mueve mucho más que lo ‘normal', parece que se mueve por moverse . Asimismo, se le dificulta mucho poner atención en lo que ve o escucha, solamente es capaz de atender con interés durante lapsos muy breves. Otra característica es que no concluye las cosas que empieza: juegos, tareas escolares, etcétera.",
            imagen: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/04/GettyImages-1301603007_header-1024x575.jpg?w=1155&h=1528",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: iddificil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 5,
            pregunta: "¿Las conductas violentas durante la infancia desempeñan un papel importante para que los niños y adolescentes se inicien en el consumo de drogas?",
            imagen: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/04/GettyImages-1301603007_header-1024x575.jpg?w=1155&h=1528",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: iddificil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 6,
            pregunta: "La hiperactividad: Se determina por falta de atención y concentración en las distintas actividades y conducta impulsiva. Lo anterior se debe a que existe una disfunción cerebral menor. Cuando la impulsividad y la inquietud rebasan los límites, es necesario atender al niño que las padece a tiempo, ya que estas características suelen generar rechazo por parte de familiares, amigos, compañeros y maestros.",
            imagen: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/04/GettyImages-1301603007_header-1024x575.jpg?w=1155&h=1528",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: iddificil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 7,
            pregunta: "¿El estrés es la reacción que tiene una persona ante situaciones amenazantes, angustiantes o que ponen en riesgo su bienestar; ¿provoca, además, un deseo intenso de huir de la situación o de enfrentarla violentamente?",
            imagen: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/04/GettyImages-1301603007_header-1024x575.jpg?w=1155&h=1528",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: iddificil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 8,
            pregunta: "Cuando una persona tiene constantes niveles altos de estrés es probable que en ese mismo grado se deprima o se sienta exageradamente presionado, lo que puede llevarlo al consumo de drogas.",
            imagen: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/04/GettyImages-1301603007_header-1024x575.jpg?w=1155&h=1528",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: iddificil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 9,
            pregunta: "¿Cuándo una persona tiene constante estrés es bueno tomarse un tiempo libre y beberse una cerveza ya que esta puede bajar el nivel de estrés?",
            imagen: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/04/GettyImages-1301603007_header-1024x575.jpg?w=1155&h=1528",
            respuesta: [{
                respuesta: "Verdadero",
                valida: false
            }, {
                respuesta: "Falso",
                valida: true
            }],
            juego: iddificil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),

        new Pregunta({
            numero: 10,
            pregunta: "La diferencia está en el control que cada persona tenga para dosificar la cantidad y la frecuencia del consumo de alguna sustancia. En lo general, el grado de control se relaciona con el tiempo de consumo de cierta sustancia, como alcohol o mariguana, aunque a veces no es necesariamente así.",
            imagen: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/04/GettyImages-1301603007_header-1024x575.jpg?w=1155&h=1528",
            respuesta: [{
                respuesta: "Verdadero",
                valida: true
            }, {
                respuesta: "Falso",
                valida: false
            }],
            juego: iddificil._id // AQUI USO EL ID DE FACIL QUE OBTUVE EN LINEA 43
        }).save(),
    ]);

    // MOSTRARLOS EN CONSOLA
    console.log(values);
}


module.exports = {
    crearJuego,
    agregarPreguntas
}