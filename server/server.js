const colors = require('colors');
const mongoose = require('mongoose');
const path = require('path'); //Sirve para poder utilizar paths dentro de nuestro código
const express = require('express');
const bodyParser = require('body-parser');
require('./config/config'); //Archivo de configuraciones, de esta forma se levanta automáticamente y lo corre

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); //Middleware cuando es app.use

// parse application/json
app.use(bodyParser.json());

//Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//Configuracion globar de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB,
        {useNewUrlParser:true, useCreateIndex:true}, //Configuraciones a la hora de hacer la conexion a mongo
        (err, res) => {
    if(err) throw err;

    console.log('Base de datos: ' + 'ONLINE'.green);

});
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);


app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT);
});