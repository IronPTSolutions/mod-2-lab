const express = require("express");
const hbs = require("hbs");

const app = express();

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`)


// Config static files
app.use(express.static("public"));


/* Routes */

const router = require("./config/routes.config.js")
app.use(router);

app.listen(3000, () => {
    console.log("Ready!");
});
