'use strict'

const Citas = require('../models/citas.model'); 



// crear cita desde el usuario doctor
function crearCitas(req, res) { 
    var modelocitas = new Citas();
    var params = req.body;

    if (params.fecha_de_cita && params.usuario && params.doctor) {
        modelocitas.doctor = req.user.sub;
        modelocitas.usuario = params.usuario;
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

//no me muestra en consola los datos del doctor solamente el id
//mostrar citas
async function obtenerCitas(req, res) {
    

   await Citas.find().populate('datos_doctor').exec((err, citas) => {

        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!citas) {
            return res.status(500).send({ mensaje: "No se han podido obtener las citas" })
        } else {
            return res.status(200).send({ citas })
        }
    })

}


//obtener cita por id , funcional
async function obtenerCitasID(req, res) {
    var idCita = req.params.idCita
    
    await Citas.findById(idCita, (err, cita) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!cita) {
            return res.status(500).send({ mensaje: "No se ha podido obtener la cita" })
        } else {
            return res.status(200).send({ cita })
        }
    })
}



//me da error al editar la cita
//editar cita
async function editarCitas(req, res){
    var idCita = req.params.idCita;
    var params = req.body;
   

    await Citas.findByIdAndUpdate(idCita, params, { new: true }, (err, citaActualizada)=>{
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!citaActualizada) {
            return res.status(500).send({ mensaje: "No se ha podido editar la cita" })
        } else {
            return res.status(200).send({ citaActualizada })
        }
    })

    
}


//no me deja eliminar cita
//eliminar cita
async function eliminarCitas(req, res){
    const idCita =req.params.idCita;


    await Citas.findByIdAndDelete(idCita, (err, citaEliminada)=>{
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
    obtenerCitasID,
    editarCitas,
    eliminarCitas
}