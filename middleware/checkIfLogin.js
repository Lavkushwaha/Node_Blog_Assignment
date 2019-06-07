var config = require('../config/config');
var jwt = require('jsonwebtoken');
const Token = require("../models/jwt-manager.model");

function checkLogin(req, res, next){
    var cookies = req.cookies;
    username = '';
    jwt.verify(cookies.token, config.jwtSecret, function(err, payload){
        if(err) {
            res.locals.tokenError = 'Invalid token';
            return next();
        }
        username = payload.username;

        Token.findOne({token: cookies.token},function(err, token){
            if(err){
                res.locals.tokenError = 'some error';
                return next();
            }
            if(!token){
                res.locals.tokenError = 'Invalid token';
                return next();
            }
            res.locals.tokenError = 'valid token exists';
            res.locals.username = username;
            return next();

        });
    });
}

module.exports = checkLogin;