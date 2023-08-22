const express = require("express");
const hbs = require ("hbs");
const morgan = require("morgan");
const session = require("express-session");

const app = express();

// Connect mongo
require("./config/db.config.js");

//logger
app.use(morgan("dev"))

// Configure view engine
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
hbs.registerPartials(`${__dirname}/views/partials`);


// Support req.body 
app.use(express.urlencoded({ extended: true }));

//configure static fields
app.use(express.static("public"));

//Rooutes
const router = require("./config/routes.config.js")
app.use(router);


const port = 3000
app.listen(port, () => console.info(`Application running at port ${port}`));