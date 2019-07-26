
//===============
//    Puerto
//===============
process.env.PORT = process.env.PORT || 3000;


//===============
//    Entorno
//===============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//===============
//   DataBase
//===============
let urlDB;

// if( process.env.NODE_ENV === 'dev'){
//     urlDB = 'mongodb://localhost:27017/cuentas'
// }else{
    urlDB = 'mongodb+srv://kenjiman:p9YxtOCvGmOobqaJ@llevomiscuentasdb-2xdud.mongodb.net/llevomiscuentas'
// }

process.env.URLDB = urlDB;