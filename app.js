const express = require("express");
const logger = require('morgan');
const app = express();

/** Apply configs **/
require("./config/db.config");
require("./config/hbs.config");

/** Configure view engine **/
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

/** Logger */
app.use(logger("dev"));

/** Session middleware */
const sessionConfig = require('./config/session.config');
app.use(sessionConfig.session);
app.use(sessionConfig.loadSessionUser);

app.use((req, res, next) => {
  res.locals.navigationPath = req.path
  next()
})

/** Support req.body **/
app.use(express.urlencoded());

/** Configure static files */
app.use(express.static("public"));

/** Routes */
const router = require("./config/routes.config");
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Ready!");
});
