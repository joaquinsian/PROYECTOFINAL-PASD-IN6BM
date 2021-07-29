'use strict'

const Informacion = require('../models/informacion.model')


//agregar  informacion 
function agregarInformacion(req, res){
    var modeloinfo = new Informacion();
    var params = req.body;

    if(params.titulo && params.contenido && params.ImagenPrincipal){
        modeloinfo.titulo = params.titulo;
        modeloinfo.contenido = params.contenido;
        modeloinfo.ImagenPrincipal = params.ImagenPrincipal;

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

//mostrar informacion
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

//editar informacion
function editarInformacion(req, res){
    var params = req.body; 
   /* var idInformacion = req.params.idInformacion;
    var params = req.body; 
   
    //req.user.sub <-- id usuario logeado
    if(idUsuario != req.user.sub){
        //return es para detener las peticiones
        return res.status(500).send({mensaje : 'No posees los permisos necesarios para actualizar este '})
    
    }*/

    Informacion.findByIdAndUpdate(idUsuario, params, { new: true }, (err, usuarioActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la petición '});
        if(!usuarioActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el Usuario'});
        return res.status(200).send({ usuarioActualizado });
    })
}



module.exports = {
    agregarInformacion,
    obtenerInformacion
}