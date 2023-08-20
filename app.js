const express = require('express');
const hbs = require ('hbs');
const morgan = require("morgan")
const app = express();


require("./config/db.config")
const session = require('./config/session.config')

//vistas
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
hbs.registerPartials(__dirname + "/views/partials")
hbs.registerHelper("inputDateFormat", (date) => {
    return date.toISOString().split("T")[0];
  });



//session middleware
app.use(session);

/** logger */
app.use(morgan("dev"));

/** Support req.body **/
app.use(express.urlencoded({ extended: true }));

/** Congiure static files */
app.use(express.static("public"));

/** Routes */
const router = require("./config/routes.config");
app.use(router);

//litsen 
app.listen(3000, ()=>{
    console.log('estoy escuchando:)')
})