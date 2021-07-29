'use strict'
const Usuario = require('../models/usuario.model')
const Datos_Doctor = require('../models/datos_doctor.model')
const bcrypt = require('bcrypt-nodejs')

//Función para registro
async function registro(req, res){
    var usuarioModel = new Usuario();
    var params = req.body;
    if(params.nombre && params.usuario && params.dpi){
        usuarioModel.nombre = params.nombre;
        usuarioModel.usuario = params.usuario;
        usuarioModel.dpi = params.dpi;
        usuarioModel.email = params.email;
        usuarioModel.celular = params.celular
        usuarioModel.rol = "Paciente";

        await Usuario.find({$or: [
            {dpi: usuarioModel.dpi}
        ]}).exec((err, usuarioEncontrado) => {
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(usuarioEncontrado && usuarioEncontrado.length >= 1){
                return res.status(500).send({mensaje: "El usuario es existente"})
            }else{
                bcrypt.hash(params.password, null, null, (err, passEncrypt) => {
                    usuarioModel.password = passEncrypt;
                    usuarioModel.save((err, usuarioGuardado) => {
                        if(err){
                            return res.status(500).send({mensaje: "Error en la petición al momento de hacer el registro"})
                        }else if(!usuarioGuardado){
                            return res.status(500).send({mensaje: "No se ha podido guardar el registro"})
                        }else{
                            return res.status(200).send({usuarioGuardado})
                        }
                    })
                })
            }
        })
    }else{
        return res.status(500).send({mensaje: "No ha completado todos los parámetros"})
    }
}

//Función para editar el mismo usuario
async function editarUsuario(req, res){
    var idUsuario = req.params.idUsuario;
    var params = req.body;
    if(req.user.sub != idUsuario){
        return res.status(500).send({mensaje: "No tiene la autorización para editar el usuario"})
    }else{
        delete params.password;
        await Usuario.findByIdAndUpdate(idUsuario, params, {new: true}, (err, usuarioEditado) => {
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!usuarioEditado){
                return res.status(500).send({mensaje: "No se ha podido editar el usuario"})
            }else{
                return res.status(200).send({usuarioEditado})
            }
        })
    }
}

//Función para eliminar el mismo usuario
async function eliminarUsuario(req, res){
    var idUsuario = req.params.idUsuario;
    if(req.user.sub != idUsuario){
        return res.status(500).send({mensaje: "No tiene la autorización para eliminar el usuario"})
    }else{
        await Usuario.findByIdAndDelete(idUsuario, (err, usuarioEliminado) => {
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!usuarioEliminado){
                return res.status(500).send({mensaje: "No se ha podido podido eliminar el usuario"})
            }else{
                return res.status(200).send({usuarioEliminado})
            }
        })
    }
}

//Función para obtener un usuario por id
async function usuarioId(req, res){
    var idUsuario = req.params.idUsuario;
    await Usuario.findById(idUsuario, (err, usuarioEncontrado)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!usuarioEncontrado){
            return res.status(500).send({mensaje: "No se ha podido obtener el usuario"})
        }else{
            return res.status(200).send({usuarioEncontrado})
        }
    })
}

//Función para solicitar ser doctor
async function solicitudDoctor(req, res){
    var modelDoctor = new Datos_Doctor();
    var params = req.body;
    if(params.foto && params.hospital && params.especialidad){
        modelDoctor.foto = params.foto;
        modelDoctor.hospital = params.hospital;
        modelDoctor.especialidad = params.especialidad;
        modelDoctor.solicitud = false;
        modelDoctor.usuario = req.user.sub;

        await Datos_Doctor.find({$or: [
            {foto: modelDoctor.foto},
            {usuario: modelDoctor.usuario}
        ]}).exec((err, doctorVisto) => {
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(doctorVisto && doctorVisto.length >= 1){
                return res.status(500).send({mensaje: "Ya fue enviada la solicitud"}) 
            }else{
                modelDoctor.save((err, doctorNuevo) => {
                    if(err){
                        return res.status(500).send({mensaje: "Error en la petición"})
                    }else if(!doctorNuevo){
                        return res.status(500).send({mensaje: "No se ha podido guardar el doctor"})
                    }else{
                        return res.status(200).send({doctorNuevo})
                    }
                })
            }
        })
    }else{
        return res.status(500).send({mensaje: "No ha completado todos los parámetros"})
    }
}

module.exports = {
    registro,
    editarUsuario,
    eliminarUsuario,
    usuarioId,
    solicitudDoctor
}