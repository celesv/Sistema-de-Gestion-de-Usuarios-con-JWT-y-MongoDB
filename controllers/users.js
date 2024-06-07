"use strict";

const { validationResult } = require("express-validator");

var Users = require("../models/users");

var controller = {
  userlist: function (req, res) {
    Users.find({})
      .then((usuarios) => {
        console.log(usuarios);
        return res
          .status(200)
          .send({ status: 200, mesagge: "Usuarios listados", data: usuarios });
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(500)
          .send({ status: 500, mesagge: "Error al traer los usuarios" });
      });
  },

  createUser: function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    var data = req.body;

    // Usuario existente?
    Users.findOne({ iduser: data.iduser })
      .then((usuarios) => {
        console.log(usuarios);

        // Validacion de usuario duplicado
        if (usuarios) {
          return res.status(400).send({
            status: 400,
            mesagge: "Usuario existente",
          });
        }

        var create_user = new Users();

        create_user.name = data.name;
        create_user.apellido = data.apellido;
        create_user.edad = data.edad;
        create_user.email = data.email;
        create_user.materias = data.materias;
        create_user.grupos = data.grupos;
        create_user.iduser = data.iduser;

        create_user
          .save()
          .then((result) => {
            var resp_s = {
              _id: result._id, // Ver el _id de mongoose
            };

            return res.status(200).send({
              status: 200,
              mesagge: "Usuario almacenado",
              data: result,
            });
          })
          .catch((error) => {
            console.error(error);
            return res
              .status(500)
              .send({ status: 500, mesagge: "Error detectado" });
          });
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(500)
          .send({ status: 500, mesagge: "Error detectado" });
      });

    console.log(data);
    console.log(data.name);
    console.log(data.edad);
    console.log(`Hola mundo, desde el createUser. Mi nombre es ${data.name}`);
  },

  userSingular: function (req, res) {
    var params = req.params;
    var idusers = params.iduser;

    Users.findOne({ iduser: parseInt(idusers) })
      .then((usuarios) => {
        console.log(usuarios);
        return res.status(200).send({
          status: 200,
          mesagge: "Informacion de usuario",
          data: usuarios,
        });
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(500)
          .send({ status: 500, mesagge: "Error al traer los usuarios" });
      });
  },

  updateuser: function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    var params = req.params;
    var idusers = params.iduser;

    var data = req.body;

    var update_user = {
      name: data.name,
      apellido: data.apellido,
      edad: data.edad,
      email: data.email,
      materias: data.materias,
      grupos: data.grupos,
      iduser: data.iduser,
    };

    Users.findOneAndUpdate({ iduser: parseInt(idusers) }, update_user)
      .then((usuarios) => {
        if (!usuarios) {
          return res.status(200).send({
            status: 200,
            mesagge: "Usuario no encontrado",
          });
        }
        return res.status(200).send({
          status: 200,
          mesagge: "Usuario actualizado",
        });
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(500)
          .send({ status: 500, mesagge: "Error detectado" });
      });
  },

  deleteuser: function (req, res) {
    var params = req.params;
    var idusers = params.iduser;

    Users.findOneAndDelete({ iduser: parseInt(idusers) })
      .then((usuarios) => {
        if (!usuarios) {
          return res.status(200).send({
            status: 200,
            mesagge: "Usuario no encontrado",
          });
        }
        return res.status(200).send({
          status: 200,
          mesagge: "Usuario eliminado",
          data: usuarios,
        });
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(500)
          .send({ status: 500, mesagge: "Error detectado" });
      });
  },
};

module.exports = controller;
