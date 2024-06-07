'use strict';

const mongoose = require('mongoose');

var app = require("./app");

var port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://celeste:1234@cluster0.o7sgf3o.mongodb.net/curso2024", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
    var server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    server.timeout = 120000;
  })
  .catch((err) => console.log(err));
