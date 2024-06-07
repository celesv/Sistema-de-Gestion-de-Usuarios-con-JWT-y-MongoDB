'use strict';

const express = require('express');

const {body} = require('express-validator');

var api = express.Router();

var middleware = require("../middleware/middleware");

var userController = require("../controllers/users");
var authController = require("../controllers/auth");

// Login
api.post('/login',[body("email").not().isEmpty(), body("password").not().isEmpty()],authController.login_user);


// Usuarios 
// GET
api.get("/user", middleware.userprotectUrl,userController.userlist);
api.get("/user/:iduser",middleware.userprotectUrl, userController.userSingular);

// POST
api.post("/user",middleware.userprotectUrl,[body("name").not().isEmpty(),body("apellido").not().isEmpty(), body("edad").not().isEmpty(), body("email").not().isEmpty(), body("materias").not().isEmpty(), body("grupos").not().isEmpty(), body("iduser").not().isEmpty()], userController.createUser);

// PUT
api.put("/user/:iduser",middleware.userprotectUrl,[body("name").not().isEmpty(),body("apellido").not().isEmpty(), body("edad").not().isEmpty(), body("email").not().isEmpty(), body("materias").not().isEmpty(), body("grupos").not().isEmpty(), body("iduser").not().isEmpty()], userController.updateuser)

// DELETE
api.delete("/user/:iduser",middleware.userprotectUrl, userController.deleteuser)

module.exports = api;
