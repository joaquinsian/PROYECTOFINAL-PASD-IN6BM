'use strict'
const Usuario = require('../models/usuario.model')
const Datos_Doctor = require('../models/datos_doctor.model')
const bcrypt = require('bcrypt-nodejs')

//Función para crear un administrador
async function adminDefault(nombre, usuario, dpi, email, celular, password, foto, descripcion, rol){
    var usuarioModel = new Usuario();

    if(nombre && usuario && dpi && password && rol){
        usuarioModel.nombre = nombre;
        usuarioModel.usuario = usuario;
        usuarioModel.dpi = dpi;
        usuarioModel.email = email;
        usuarioModel.celular = celular;
        usuarioModel.password = password;
        usuarioModel.foto = foto;
        usuarioModel.descripcion = descripcion;
        usuarioModel.rol = rol;

        await Usuario.find({$or: [
            {dpi: usuarioModel.dpi}
        ]}).exec((err, adminEncontrado) => {
            if(err){
                console.log("Error en la petición");
            }else if(adminEncontrado && adminEncontrado.length >= 1){
                console.log("El administrador es existente");
            }else{
                bcrypt.hash(usuarioModel.password, null, null, (err, passEncrypt) => {
                    usuarioModel.password = passEncrypt;
                    usuarioModel.save((err, adminGuardado) => {
                        if(err){
                            console.log("Error en la petición al guardar el administrador");
                        }else if(!adminGuardado){
                            console.log("No se pudo almacenar el administrador");
                        }else{
                            console.log(adminGuardado);
                        }
                    })
                })
            }
        })

    }else{
        return res.status(500).send({mensaje: "No ha ingresado todos los parámetros"})
    }
}

//Función para obtener un usuario por id
async function obtenerUsuarioId(req, res){
    if(req.user.rol === "Admin"){
        var idUsuario = req.params.idUsuario;
        await Usuario.findById(idUsuario, (err, usuarioEncontrado) => {
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!usuarioEncontrado){
                return res.status(500).send({mensaje: "No se ha podido obtener el usuario"})
            }else{
                return res.status(200).send({usuarioEncontrado})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para obtener a todos los usuarios
async function todosUsuarios(req, res){
    if(req.user.rol === "Admin"){
        await Usuario.find((err, usuarios) => {
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!usuarios){
                return res.status(500).send({mensaje: "No se ha podido obtener los usuarios"})
            }else{
                return res.status(200).send({usuarios})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para editar cualquier usuario
async function editarUsuario(req, res){
    if(req.user.rol === "Admin"){
        var idUsuario = req.params.idUsuario;
        var params = req.body;
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

    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para eliminar cualquier usuario
async function eliminarUsuario(req, res){
    if(req.user.rol === "Admin"){
        var idUsuario = req.params.idUsuario;
        
        await Usuario.findByIdAndDelete(idUsuario, (err, usuarioEliminado) => {
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!usuarioEliminado){
                return res.status(500).send({mensaje: "No se ha podido eliminar el usuario"})
            }else{
                return res.status(200).send({usuarioEliminado})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para obtener las solicitudes de doctor pendientes
async function solicitudPendiente(req, res){
    if(req.user.rol === "Admin"){
        await Datos_Doctor.find({solicitud: false}).populate('usuario').exec((err, solicitudes) => {
            if(err){
                console.log(err);
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!solicitudes){
                return res.status(500).send({mensaje: "No se han podido obtener las solicitudes"})
            }else if(solicitudes && solicitudes.length >= 1){
                return res.status(200).send({solicitudes})
            }else{
                return res.status(200).send({mensaje: "No hay solicitudes pendientes"})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para obtener la solicitud por id
async function solicitudId(req, res){
    if(req.user.rol === "Admin"){
        var idSolicitud = req.params.idSolicitud;
        await Datos_Doctor.findById(idSolicitud).populate('usuario').exec((err, solicitud) => {
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!solicitud){
                return res.status(500).send({ mensaje: "No se ha podido obtener la solicitud"})
            }else{
                return res.status(200).send({solicitud})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para aceptar o rechazar la solicitud del doctor
async function aceptarSolicitud(req, res){
    var idSolicitud = req.params.idSolicitud;
    var Doc = await Datos_Doctor.findById(idSolicitud);
    await Datos_Doctor.findByIdAndUpdate(idSolicitud, {solicitud: true}, {new: true}, (err, solicitudAceptada) => {
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!solicitudAceptada){
            return res.status(500).send({mensaje: "No se ha podido aceptar la solicitud"})
        }else{
            res.json(solicitudAceptada)
        }
    })
    await Usuario.findByIdAndUpdate(Doc.usuario, {rol: "Doctor"}, {new: true})
    console.log("Usuario Convertido A doctor");
}

//Función para rechazar solicitud
async function rechazarSolicitud(req, res){
    if(req.user.rol === "Admin"){
        var idSolicitud = req.params.idSolicitud;
        await Datos_Doctor.findByIdAndDelete(idSolicitud, (err, solicitudRechazada) => {
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!solicitudRechazada){
                return res.status(500).send({mensaje: "No se ha podido rechazar la solicitud"})
            }else{
                return res.status(200).send({solicitudRechazada})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

module.exports = {
    adminDefault,
    obtenerUsuarioId,
    todosUsuarios,
    editarUsuario,
    eliminarUsuario,
    solicitudId,
    solicitudPendiente,
    aceptarSolicitud,
    rechazarSolicitud
}