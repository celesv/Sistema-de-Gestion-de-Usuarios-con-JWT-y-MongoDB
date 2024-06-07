"use strict";

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AccessTokenSchema = Schema({
  user: { type: String, require: true, unique: true },
  key: String,
  creationDate: Date,
  expirationDate: String,
  active: Boolean,
});

module.exports = mongoose.model("accesstoken", AccessTokenSchema);
