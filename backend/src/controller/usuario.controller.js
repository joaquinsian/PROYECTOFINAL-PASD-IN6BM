'use strict'
const Usuario = require('../models/usuario.model')
const Datos_Doctor = require('../models/datos_doctor.model')
const Rel_Doc_User = require('../models/rel_doc_user.model')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')

//Función para registro
async function registro(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body;
    if (params.nombre && params.usuario && params.dpi) {
        usuarioModel.nombre = params.nombre;
        usuarioModel.usuario = params.usuario;
        usuarioModel.dpi = params.dpi;
        usuarioModel.email = params.email;
        usuarioModel.celular = params.celular
        usuarioModel.foto = params.foto;
        usuarioModel.descripcion = params.descripcion;
        usuarioModel.rol = "Paciente";

        await Usuario.find({
            $or: [
                { dpi: usuarioModel.dpi }
            ]
        }).exec((err, usuarioEncontrado) => {
            if (err) {
                return res.status(500).send({ mensaje: "Error en la petición" })
            } else if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
                return res.status(500).send({ mensaje: "El usuario es existente" })
            } else {
                bcrypt.hash(params.password, null, null, (err, passEncrypt) => {
                    usuarioModel.password = passEncrypt;
                    usuarioModel.save((err, usuarioGuardado) => {
                        if (err) {
                            return res.status(500).send({ mensaje: "Error en la petición al momento de hacer el registro" })
                        } else if (!usuarioGuardado) {
                            return res.status(500).send({ mensaje: "No se ha podido guardar el registro" })
                        } else {
                            return res.status(200).send({ usuarioGuardado })
                        }
                    })
                })
            }
        })
    } else {
        return res.status(500).send({ mensaje: "No ha completado todos los parámetros" })
    }
}

async function obtenerIdentidad(req, res) {
    let x = jwt.decode(req.headers["authorization"], "PASD");
    res.json(x)
}

async function obtenerUsuarios(req, res) {
    await Usuario.find()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => console.error(err));
}

//Función para editar el mismo usuario
async function editarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    var params = req.body;
    if (req.user.sub != idUsuario) {
        return res.status(500).send({ mensaje: "No tiene la autorización para editar el usuario" })
    } else {
        delete params.password;
        await Usuario.findByIdAndUpdate(idUsuario, params, { new: true }, (err, usuarioEditado) => {
            if (err) {
                return res.status(500).send({ mensaje: "Error en la petición" })
            } else if (!usuarioEditado) {
                return res.status(500).send({ mensaje: "No se ha podido editar el usuario" })
            } else {
                return res.status(200).send({ usuarioEditado })
            }
        })
    }
}

//Función para eliminar el mismo usuario
async function eliminarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    if (req.user.sub != idUsuario) {
        return res.status(500).send({ mensaje: "No tiene la autorización para eliminar el usuario" })
    } else {
        await Usuario.findByIdAndDelete(idUsuario, (err, usuarioEliminado) => {
            if (err) {
                return res.status(500).send({ mensaje: "Error en la petición" })
            } else if (!usuarioEliminado) {
                return res.status(500).send({ mensaje: "No se ha podido podido eliminar el usuario" })
            } else {
                return res.status(200).send({ usuarioEliminado })
            }
        })
    }
}

//Función para obtener un usuario por id
async function usuarioId(req, res) {
    let x = jwt.decode(req.headers["authorization"], "PASD");
    await Usuario.findById(x.sub, (err, usuarioEncontrado) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!usuarioEncontrado) {
            return res.status(500).send({ mensaje: "No se ha podido obtener el usuario" })
        } else {
            return res.status(200).send({ usuarioEncontrado })
        }
    })
}

//Función para solicitar ser doctor
async function solicitudDoctor(req, res) {
    var modelDoctor = new Datos_Doctor();
    var params = req.body;
    if (params.foto && params.hospital && params.especialidad) {
        modelDoctor.foto = params.foto;
        modelDoctor.hospital = params.hospital;
        modelDoctor.especialidad = params.especialidad;
        modelDoctor.solicitud = false;
        modelDoctor.usuario = req.user.sub;
        await Datos_Doctor.find({
            $or: [
                { foto: modelDoctor.foto },
                { usuario: modelDoctor.usuario }
            ]
        }).exec((err, doctorVisto) => {
            if (err) {
                return res.status(500).send({ mensaje: "Error en la petición" })
            } else if (doctorVisto && doctorVisto.length >= 1) {
                return res.status(500).send({ mensaje: "Ya fue enviada la solicitud" })
            } else {
                modelDoctor.save((err, doctorNuevo) => {
                    if (err) {
                        return res.status(500).send({ mensaje: "Error en la petición" })
                    } else if (!doctorNuevo) {
                        return res.status(500).send({ mensaje: "No se ha podido guardar el doctor" })
                    } else {
                        return res.status(200).send({ doctorNuevo })
                    }
                })
            }
        })
    } else {
        return res.status(500).send({ mensaje: "No ha completado todos los parámetros" })
    }
}

//Función para obtener los doctores
async function doctores(req, res) {
    await Usuario.find({ rol: "Doctor" }, (err, doctores) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!doctores) {
            return res.status(500).send({ mensaje: "No se ha podido obtener los doctores" })
        } else {
            return res.status(200).send({ doctores })
        }
    })
}

//Función para elegir doctor
async function elegirDoctor(req, res) {
    var rel_doc_userModel = new Rel_Doc_User();
    var params = req.body;
    if (params.doctor) {
        rel_doc_userModel.doctor = params.doctor;
        rel_doc_userModel.usuario = req.user.sub;
        rel_doc_userModel.progreso = null;

        var doctor = await Usuario.findById(params.doctor)
        if (doctor.rol === "Doctor") {
            await Rel_Doc_User.find({
                $or: [
                    { usuario: rel_doc_userModel.usuario }
                ]
            }).exec((err, relacion) => {
                if (err) {
                    return res.status(500).send({ mensaje: "Error en la petición" })
                } else if (relacion && relacion.length >= 1) {
                    return res.status(500).send({ mensaje: "Usted ya tiene un doctor" })
                } else {
                    rel_doc_userModel.save((err, relacionGuardada) => {
                        if (err) {
                            return res.status(500).send({ mensaje: "Error en la petición" })
                        } else if (!relacionGuardada) {
                            return res.status(500).send({ mensaje: "No se pudo registrar la relación" })
                        } else {
                            return res.status(200).send({ relacionGuardada })
                        }
                    })
                }
            })
        } else {
            return res.status(500).send({ mensaje: "Doctor no localizado" })
        }
    } else {
        return res.status(500).send({ mensaje: "No ha completado todos los parámetros" })
    }
}

//Función para eliminar la relación de doctor
async function eliminarMiDoctor(req, res) {
    let x = jwt.decode(req.headers["authorization"], "PASD");
    await Rel_Doc_User.findOneAndDelete({ usuario: x.sub }, (err, relacionEliminada) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!relacionEliminada) {
            console.log(relacionEliminada);
            return res.status(500).send({ mensaje: "No se ha podido eliminar la relación" })
        } else {
            return res.status(200).send({ relacionEliminada })
        }
    })
}

//Función para obtener el la relación de doctor y progreso
async function obtenerDoctor(req, res) {
    let x = jwt.decode(req.headers["authorization"], "PASD");
    await Rel_Doc_User.find({ usuario: x.sub }).populate('doctor usuario').exec((err, resultado) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!resultado) {
            console.log(resultado);
            return res.status(500).send({ mensaje: "No se ha podido obtener la relación" })
        } else if (resultado && resultado.length === 0) {
            return res.status(200).send({ mensaje: "Aún no contiene doctor" })
        } else if (resultado && resultado.length >= 1) {
            return res.status(200).send({ mensaje: "Contiene doctor" });
        }
    })
}

//Función obtener datos relación doc
async function relDoc(req, res) {
    let x = jwt.decode(req.headers["authorization"], "PASD");
    await Rel_Doc_User.find({ usuario: x.sub }).populate('doctor usuario').exec((err, resultado) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!resultado) {
            return res.status(500).send({ mensaje: "No se ha podido obtener la relación" })
        } else if (resultado && resultado.length === 0) {
            return res.status(200).send({ mensaje: "Aún no contiene doctor" })
        } else if (resultado && resultado.length >= 1) {
            return res.status(200).send({ resultado })
        }
    })
}

//Función para obtener la especialidad de los doctores
async function doctoresDetalle(req, res) {
    await Datos_Doctor.find({ solicitud: true }).populate('usuario').exec((err, datos) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!datos) {
            return res.status(500).send({ mensaje: "No se ha podido obtener a los doctores" })
        } else {
            return res.status(200).send({ datos })
        }
    })
}

module.exports = {
    registro,
    obtenerUsuarios,
    editarUsuario,
    eliminarUsuario,
    usuarioId,
    solicitudDoctor,
    doctores,
    elegirDoctor,
    eliminarMiDoctor,
    obtenerIdentidad,
    obtenerDoctor,
    relDoc,
    doctoresDetalle
}