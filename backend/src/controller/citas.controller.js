'use strict'

const Citas = require('../models/citas.model')


function crearCitas(req, res) {
    var modelocitas = new Citas();
    var params = req.body;

    if (params.doctor && params.fecha_de_cita) {

        modelocitas.doctor = params.doctor;
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



module.exports = {
    crearCitas
}