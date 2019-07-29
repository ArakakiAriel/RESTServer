const jwt = require('jsonwebtoken');



//=========================
//     Verificar Token
//=========================
let verifyToken = (req, res, next) => {
    let token = req.get('Authorization'); //Con el req.get() podemos obtener los valores de los headers
    
    //jwt.verify(token-a-verificar, SEED-con-la-que-se-creo-el-token, callback-que-devuelve-el-token-decodificado)
    jwt.verify(token, process.env.SEED, (err,decoded) => { //De esta forma podemos verificar si la persona que ejecuta es quien dice ser con el token generado en el login
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        
        req.user = decoded.user;

        next();

    });
}

//=========================
//      Verificar Rol
//=========================
let verifyAdminRole = (req, res, next) => {
    let user = req.user;
   
    if(!(user.role === 'ADMIN_ROLE')){
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Usted no tiene autorización para realizar dicha ejecución.'
            }
        });
    }
    
    next();

}


module.exports = {
    verifyToken,
    verifyAdminRole
}