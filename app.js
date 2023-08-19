const express = require("express");
const app = express();
const hbs = require("hbs");
const morgan = require("morgan");


//connect to db
require("./config/db.config");

/** Configure view engine **/
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
hbs.registerPartials(__dirname + "/views/partials");

/** Configure static files**/
app.use(express.static("public"));

/** Routes**/
const router = require("./config/routes.config");
app.use(router);

app.listen(3000, () => {
  console.log("Ready!");
});