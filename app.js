const express = require("express");
const morgan = require("morgan");
const app = express();

/** Apply configs **/
require("./config/db.config");
const session = require("./config/session.config");
require("./config/hbs.config");

/** Configure view engine **/
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

/** Logger */
app.use(morgan("dev"));

/** Session middleware */
app.use(session);

/** Support req.body **/
app.use(express.urlencoded({ extended: true }));

/** Configure static files */
app.use(express.static("public"));

/** Routes */
const router = require("./config/routes.config");
app.use(router);

app.listen(3000, () => {
  console.log("Ready!");
});
