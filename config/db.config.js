const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/tweeter") //, { useNewUrlParser: true, useUnifiedTopology: true }
  .then(() => {
    console.log('Conexión a la base de datos establecida');
  })
  .catch(error => {
    console.error('Error en la conexión a la base de datos:', error);
  });

  