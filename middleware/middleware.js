'use strict'

require('dotenv').config();
var jwt = require("jsonwebtoken");

var Sessions = require('../models/accesstoken');

var middleware = {

    userprotectUrl: function (req, res, next) {

        const token = req.headers['x-curso2024-access-token'];

        if(token) {

            jwt.verify(token, process.env.KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        status:401,
                        message:"Token no valido"
                    });
                } else {

                    req.decoded = decoded;

                    Sessions.findOne({user:req.decoded.user.email, key: token, active:true})
                    .then(session => {
                        if(!session){
                            return res.status(401).send({
                                status:401,
                                message:"Session no encontrada"
                            });
                        }

                        next();
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).send({
                            status:500,
                            message:"Error detectado"
                        });
                    });

                }
            });


        } else {
            return res.status(401).send({
                status:401,
                message:"Datos no validos"
            });
        }

    }

};

module.exports = middleware;