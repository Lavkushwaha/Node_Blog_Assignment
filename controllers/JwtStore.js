var Token = require('../models/jwt-manager.model');

function storeJwt(key, username){

    Token.create({
        token: key,
        username: username
    },
    function(err, token) {
      if (err) return err;
    });

}

module.exports = storeJwt;