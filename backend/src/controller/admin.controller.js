'use strict'
const Usuario = require('../models/usuario.model')
const bcrypt = require('bcrypt-nodejs')

//Función para crear un administrador
async function adminDefault(nombre, usuario, dpi, password, rol){
    var usuarioModel = new Usuario();

    if(nombre && usuario && dpi && password && rol){
        usuarioModel.nombre = nombre;
        usuarioModel.usuario = usuario;
        usuarioModel.dpi = dpi;
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

module.exports = {
    adminDefault
}