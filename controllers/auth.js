"use strict";

require("dotenv").config();

var jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

var Users = require("../models/users");
var Sessions = require("../models/accesstoken");

var controller = {
  login_user: function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    var data = req.body;

    Users.findOne({ email: data.email })
      .then((usuarios) => {
        if (data.password == usuarios.password) {
          const payload = { user: usuarios };
          let acces_token = jwt.sign(payload, process.env.KEY, {
            expiresIn: "1d",
          });

          let today = new Date().toISOString();

          let update_session = {
            user: usuarios.email,
            key: acces_token,
            creationDate: today,
            expirationDate: '1d',
            active: true,
          };

          Sessions.findOneAndUpdate({ user: usuarios.email }, update_session, {upsert: true, new:true})
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
      })

      .catch((error) => {
        console.error(error);
        return res
          .status(401)
          .send({ status: 401, mesagge: "Datos no validos" });
      });
  },
};
module.exports = controller;
