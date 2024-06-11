"use strict";

require("dotenv").config();

var jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

var bcrypt = require("bcrypt");

var Users = require("../models/users");
var Sessions = require("../models/accesstoken");

var controller = {
  login_user: function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: 400, errors: errors.array() });
    }

    var data = req.body;

    Users.findOne({ email: data.email })
      .then((usuarios) => {
        // Load hash from your password DB.
        bcrypt.compare(
          data.password,
          usuarios.password,
          function (err, result) {
            if (result) {
              const payload = { user: usuarios };
              let acces_token = jwt.sign(payload, process.env.KEY, {
                expiresIn: "1d",
              });

              let today = new Date().toISOString();

              let update_session = {
                user: usuarios.email,
                key: acces_token,
                creationDate: today,
                expirationDate: "1d",
                active: true,
              };

              Sessions.findOneAndUpdate(
                { user: usuarios.email },
                update_session,
                {
                  upsert: true,
                  new: true,
                }
              )
                .then((session) => {
                  if (!session) {
                    return res.status(401).send({
                      status: 401,
                      mesagge: "Usuario no encontrado",
                    });
                  }
                  return res.status(200).send({
                    status: 200,
                    mesagge: "Login correcto",
                    token: acces_token,
                  });
                })
                .catch((error) => {
                  console.error(error);
                  return res
                    .status(500)
                    .send({ status: 500, mesagge: "Error detectado" });
                });
            } else {
              return res
                .status(401)
                .send({ status: 401, mesagge: "Datos no validos" });
            }
          }
        );
      })

      .catch((error) => {
        console.error(error);
        return res
          .status(401)
          .send({ status: 401, mesagge: "Datos no validos" });
      });
  },

  logout: function (req, res) {
    const token = req.headers["x-curso2024-access-token"];
    Sessions.findOneAndDelete({ user: req.decoded.user.email, key: token })
      .then((session) => {
        if (!session) {
          return res.status(200).send({
            status: 200,
            mesagge: "Token invalido",
          });
        }
        return res.status(200).send({
          status: 200,
          mesagge: "Sesion finalizada",
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send({ status: 500, mesagge: "Token invalido" });
      });
  },
};
module.exports = controller;
