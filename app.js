const express = require("express");
const app = express();

const hbs = require("hbs");
require("./config/db.config");
const session = require("./config/session.config");

app.set("view engine", "hbs");
app.set("/", `${__dirname}/views`);

app.use(express.urlencoded({ extended: true }));

app.use(session);

const router = require("./config/routes.config");
app.use(router);

const port = 4000;
app.listen(port, () => console.info(`Application running at port ${port}`));