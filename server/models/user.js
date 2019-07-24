const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Declaramos un esquema
let Schema = mongoose.Schema;

let validRoles = {
    values:['USER_ROLE', 'ADMIN_ROLE', 'SUPER_ROLE'],
    message: '{VALUE} is not a valid role'
};

//Dentro del esquema declaramos qué campos va a tener el usuario
let userSchema = new Schema({
    user:{
        type: String,
        required: [true, 'User is required'],
        unique: true
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"Password is required"]
    },
    img:{
        type: String,
        required: false
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    google:{
        type: Boolean,
        default: false
        },
    state:{
        type: Boolean,
        default: true
    },

});

//Utilizando esta funcion podemos quitar el password del json enviado como respuesta para que no se muestre
userSchema.methods.toJSON = function () {
    let user = this;
    let userObj = user.toObject();
    delete userObj.password;

    return userObj;
}

//Utilizar plugin particular
userSchema.plugin( uniqueValidator, {message: '{PATH} is already used by another user'});

//De esta manera estamos utilizando el userSchema con el alias user una vez exportado
module.exports = mongoose.model('user', userSchema);