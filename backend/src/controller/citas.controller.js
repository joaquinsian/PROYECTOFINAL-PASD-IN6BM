'use strict'

const Citas = require('../models/citas.model')

function crearCitas (req, res){
    var modelocitas = new Citas();
    var params = req.body;

    if(params.usuario &&  params.fecha){
        modelocitas.usuario = params.usuario;
        modelocitas.doctor = params.doctor;
        modelocitas.fecha_de_cita = params.fecha_de_cita;

       
        if (err, citaCreada){
            if(err){ 
                return res.status(500).send({mensaje: "error en la peticion"})
            }else if(!citaCreada){
                return res.status(500).send({mensaje: "No se ha podido guardar la cita"})
            }else{
                return res.status(200).send({citaCreada})
            }
        }
    }


}

module.exports = {
    crearCitas
}