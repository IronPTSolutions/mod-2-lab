const express = require('express');
const hbs = require ('hbs');
const morgan = require("morgan")
const app = express();

require("./config/db.config")

//vistas
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

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