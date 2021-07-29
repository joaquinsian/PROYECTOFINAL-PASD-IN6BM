'use strict'

const Citas = require('../models/citas.model'); 
const Usuarios = require('../models/usuario.model')

// crear cita desde el usuario doctor
function crearCitas(req, res) {
    var modelocitas = new Citas();
    var params = req.body;

    if (params.fecha_de_cita) {
        modelocitas.usuario = params.usuario;
        modelocitas.doctor = req.user.sub;
        modelocitas.fecha_de_cita = params.fecha_de_cita;

        modelocitas.save((err, citaGuardada) => {
            if (err) return res.status(500).send({ mensaje: 'Error al gurdar la cita' })

            if (citaGuardada) {
                res.status(200).send(citaGuardada)
            } else {
                res.status(404).send({ mensaje: 'No se ha podido registrar la cita' })
            }
        })

    }

}

//mostrar citas
function obtenerCitas(req, res) {
   Citas.find/*().populate('usuario').exec*/((err, citas) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!citas) {
            return res.status(500).send({ mensaje: "No se han podido obtener las citas" })
        } else {
            return res.status(200).send({ citas })
        }
    })

}

//editar cita
function editarCitas(req, res){
    var idUsuario = req.params.idUsuario;
    var params = req.body;

    
    
    if(idUsuario != req.user.sub){
      
        return res.status(500).send({mensaje : 'No posees los permisos necesarios para actualizar'})
    
    }    

    Citas.findByIdAndUpdate(idCita, params, { new: true }, (err, citaActualizada)=>{
        if(err) 
        return res.status(500).send({ mensaje: 'Error en la petición '});
        
        if(!citaActualizada) 
        return res.status(500).send({ mensaje: 'No se ha podido actualizar el Usuario'});
        
        return res.status(200).send({ citaActualizado });
    })

    
}



//eliminar cita
function eliminarCitas(req, res){
    const idUsuario =req.params.idUsuario;

    if(idUsuario!= req.user.sub){
        return res.status(403).send({ mensaje: 'No posee los permisos para eliminar la cita' })
    }

    Citas.findByIdAndDelete(idCita, (err, citaEliminada)=>{
        if(err) 
        return res.status(500).send({ mensaje: 'Error en la petición de eliminar '});
        
        if(!citaEliminada) 
        return res.status(404).send({ mensaje: 'Error al eliminar la cita' });

        return res.status(200).send({ citaEliminada });
    })
}



module.exports = {
    crearCitas,
    obtenerCitas,
    editarCitas,
    eliminarCitas
}