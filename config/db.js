const mongoose = require('mongoose');


// Conectarse a la base de datos
function conectar (conn){
  mongoose.connect(conn)
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });
}


// Exportar la instancia de mongoose
module.exports = conectar;
