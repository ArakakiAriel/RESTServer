const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./config/config'); //Archivo de configuraciones, de esta forma se levanta automáticamente y lo corre


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); //Middleware cuando es app.use
// parse application/json
app.use(bodyParser.json())

//Obtener registros
app.get('/usuario', (req, res) => {
    res.json('get Usuario');
  });
  
//Crear registros 
app.post('/usuario', (req, res) => {
    let body = req.body;

    if(body.name === undefined){
        res.status(400).json({
            ok:false,
            mensaje: "El nombre es necesario para procesar la llamada"
        });
    }else{
        res.json({
            persona: body
        });
    }

});

//Actualizar registros  
app.put('/usuario/:id1', (req, res) => {
    let id = req.params.id1; //De esta forma podemos pasar parametros desde la url y almacenarlos en una variable
    res.json({
        id
    });
});

//Borrar o cambiar estado de registros para que no este disponible (Hoy día ya no se borran registros, se cambia un flag)
app.delete('/usuario', (req, res) => {
    res.json('DELETE Usuario');
});

 
app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT);
});