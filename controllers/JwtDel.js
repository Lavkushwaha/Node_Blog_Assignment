var Token = require('../models/jwt-manager.model');

function delJwt(token){
 
    Token.remove({token: token}, (err)=> {
        return err;
    })
}

module.exports = delJwt;