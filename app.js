const express = require('express');
const app = express()


const morgan = require('morgan');
app.use(morgan('dev'))


require('./config/db.config')

const session = require('./config/session.config')
app.use(session);


app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);


app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


const router = require('./config/routes.config')
app.use(router)

app.listen(3000, () => {
    console.log('Ready')
});