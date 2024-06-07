"use strict";

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  edad: Number,
  apellido: String,
  email: String,
  password: String,
  materias: [String],
  grupos: [String],
  iduser: Number,
});

module.exports = mongoose.model("usuarios", UserSchema);
