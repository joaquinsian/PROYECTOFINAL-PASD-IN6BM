'use strict'

const Informacion = require('../models/informacion.model')


//agregar  informacion 
function agregarInformacion(req, res){
    var modeloinfo = new Informacion();
    var params = req.body;

    if(params.titulo && params.ImagenPrincipal && params.parrafos){
        modeloinfo.titulo = params.titulo;
        modeloinfo.ImagenPrincipal = params.ImagenPrincipal;
        modeloinfo.parrafos = params.parrafos;


        modeloinfo.save((err, save)=>{
            if(err){
                return res.status(500).send({mensaje: 'Error al guardar la informacion'})
            }else{
                if (save){
                    return res.status(200).send({save})
                }
            }
        })
    }


}

//mostrar informacion , funciona
function obtenerInformacion(req, res){

    Informacion.find((err, informacionEncontrada) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!informacionEncontrada) {
            return res.status(500).send({ mensaje: "No se han podido obtener la informacion" })
        } else {
            return res.status(200).send({ informacionEncontrada })
        }
    }) 

}

//mostrar informacion por id, funciona
async function obtenerInformacionID(req, res){
    var idInfo = req.params.idInfo;

    await Informacion.findById(idInfo, (err, informacionEncontrada) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!informacionEncontrada) {
            return res.status(500).send({ mensaje: "No se ha podido obtener la cita" })
        } else {
            return res.status(200).send({ informacionEncontrada })
        }
    })

}

//editar informacion, funciona 
function editarInformacion(req, res){
    var idInfo = req.params.idInfo;
    var params = req.body;

    Informacion.findByIdAndUpdate(idInfo, params, { new: true }, (err, InformacionActualizada)=>{

        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!InformacionActualizada) {
            return res.status(500).send({ mensaje: "No se ha podido editar la cita" })
        } else {
            return res.status(200).send({ InformacionActualizada })
        }
    })
}

//eliminar informacion ,funciona
async function eliminarInformacion(req, res){
    const idInfo =req.params.idInfo;


    await Informacion.findByIdAndDelete(idInfo, (err, InfoEliminada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la petición de eliminar '});
        if(!InfoEliminada) return res.status(500).send({ mensaje: 'Error al eliminar la informaciocn' });

        return res.status(200).send({ InfoEliminada });
    })

}


module.exports = {
    agregarInformacion,
    obtenerInformacion,
    obtenerInformacionID,
    editarInformacion,
    eliminarInformacion
}