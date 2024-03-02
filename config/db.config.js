const mongoose = require('mongoose');

const dbConnectionURL = 'mongodb://localhost:27017'

mongoose.connect(dbConnectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = mongoose;
