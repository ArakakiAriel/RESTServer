
//===============
//    Puerto
//===============
process.env.PORT = process.env.PORT || 3000;


//===============
//    Entorno
//===============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//========================
//  Vencimiento de Token
//========================
process.env.CADUCATE_TOKEN = 60 * 60;


//=========================
//  Seed de Autenticación
//=========================
process.env.SEED = process.env.SEED || 'seed-for-making-token';


//===============
//   DataBase
// Acá vamos a encontrar como configurar nuestra base de datos creada en MongoDB Atlas para poder almacenar allí la información
//===============
let urlDB;

if( process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cuentas'
}else{
    urlDB = 'mongodb+srv://kenjiman:p9YxtOCvGmOobqaJ@llevomiscuentasdb-2xdud.mongodb.net/llevomiscuentas'
}

process.env.URLDB = urlDB;