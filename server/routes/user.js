const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const User = require('../models/user');

const activeUsers = {state:true}
//Obtener registros
app.get('/usuario', (req, res) => {

    /*Los valores que se encuentren dentro de req.query son enviados en la url de la forma ?limite=valor&desde=otrovalor */
    let desde = Number.parseInt(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 0;

    User.find(activeUsers, 'user email role state google') //En el find podemos poner validaciones que se requieran (Ej traer solo los usuarios de google) y también qué campos mostras (Ej 'user email')
        .skip(desde) //Se saltea los primeros x cantidad de registros
        .limit(limite)//Muestra x cantidad de registros (Le pone tope)
        .exec((err, users) => { //Luego de traer los objetos que matchean se declara que hacer
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            let show = users.length;//Muestra la cant que cumple validaciones

            //User.count({validaciones que generalmente es igual a la de find},callback)
            User.count(activeUsers, (err, count) => { //count cuenta el total de registros en la bd
                res.json({ //Mando la respuesta como json
                    ok: true,
                    showing: `${show}/${count}`,
                    users
                })
            });

            
        })




});
  
//Crea nuevos usuarios
app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new User({
        user: body.user,
        email: body.email,
        password: bcrypt.hashSync(body.password, 13),
        role: body.role
    });

    usuario.save((err, userDB) => {
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        // userDB.password = null;

        res.json({
            ok: true,
            user: userDB
        })

    })

    if(body.name === undefined){
    }else{
        res.json({
            persona: body
        });
    }

});

//Actualizar registros  
app.put('/usuario/:id1', (req, res) => {
    let id = req.params.id1; //De esta forma podemos pasar parametros desde la url y almacenarlos en una variable
    let body = _.pick(req.body, ['nombre','img','email','role', 'state']);

    //Ver la documentacion https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    User.findByIdAndUpdate(id, body, {new:true, runValidators: true}, (err, userDB) => {
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    })

});

//Borrar o cambiar estado de registros para que no este disponible (Hoy día ya no se borran registros, se cambia un flag)
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(id, {state: false}, {new:true}, (err, userDB) => {
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }
        if(userDB.state === true){
            res.json({
                ok: true,
                message: `El usuario ${userDB.user} se ha dado de baja de forma satisfactoria`
            });
        }else{
            res.json({
                ok: false,
                message: `El usuario ${userDB.user} ya se encuentra dado de baja`
            });
        }
    })
});

module.exports = app;