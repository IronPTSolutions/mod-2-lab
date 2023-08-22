const express = require('express');
const app = express();
const session = require('express-session');
const hbs = require('hbs'); 
const path = require('path');
const dbConfig = require('./config/db.config'); 
const routes = require('./config/routes.config');
const bodyParser = require('body-parser');

app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true })); // Configurar la sesión
app.use('/', routes);

app.get('/', (req, res) => {
    res.render('home');
});



app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

