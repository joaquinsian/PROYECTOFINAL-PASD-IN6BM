'use strict'
const Usuario = require('../models/usuario.model')
const bcrypt = require('bcrypt-nodejs')

//Función para crear un administrador
async function adminDefault(nombre, usuario, dpi, email, celular, password, rol){
    var usuarioModel = new Usuario();

    if(nombre && usuario && dpi && password && rol){
        usuarioModel.nombre = nombre;
        usuarioModel.usuario = usuario;
        usuarioModel.dpi = dpi;
        usuarioModel.email = email;
        usuarioModel.celular = celular;
        usuarioModel.password = password;
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

//Función para obtener a todos los usuarios pacientes
async function usuarios(req, res){
    if(req.user.rol === "Admin"){
        await Usuario.find({rol: "Paciente"}, (err, usuarios) => {
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

module.exports = {
    adminDefault,
    usuarios
}