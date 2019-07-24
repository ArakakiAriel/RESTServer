const colors = require('colors');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
require('./config/config'); //Archivo de configuraciones, de esta forma se levanta automáticamente y lo corre

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); //Middleware cuando es app.use
// parse application/json
app.use(bodyParser.json())
//De esta forma utilizamos el controlador de GET POST PUT DELETE
app.use(require('./routes/user'));
mongoose.connect('mongodb://localhost:27017/cuentas',
        {useNewUrlParser:true, useCreateIndex:true}, //Configuraciones a la hora de hacer la conexion a mongo
        (err, res) => {
    if(err) throw err;

    console.log('Base de datos: ' + 'ONLINE'.green);

});

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT);
});