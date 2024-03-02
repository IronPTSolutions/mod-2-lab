const express = require('express');
const app = express();
const morgan = require("morgan")
const hbs = require ("hbs");


require('./config/db.config');
const session = require("./config/session.config");


app.set('view engine', "hbs");
app.set('views', __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials")

app.use(morgan("dev"));
app.use(session);

const router = require("./config/routes.config");
app.use(router)

app.listen(3000, () => {
    console.log("La aplicación está escuchando");
  });