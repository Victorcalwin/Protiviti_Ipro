const Jwt= require('jsonwebtoken');
const keyConfig = require('../config/key');
module.exports =  function (req, res, next) {
        let token=req.headers['authorization'];
        if(token){
            token=token.split(' ')[1];
            Jwt.verify(token, keyConfig.JwtKey, (err,valid)=>{
                if(err){
                    res.status(401).send({ message: "Please provide valid token" }); 
                }
                else{
                    next();
                }
              });


        }
        else{
            res.status(403).json({ message: "Please add token with header" });
        }
    }