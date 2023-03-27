const jwt = require('jsonwebtoken');
require("dotenv").config()
const { client } = require('../Redis Server/redis');

const authenticate = async(req,res,next)=>{
    const token = req.headers.authorization;

    if(!token){
        res.send("login again")
    }

    const blacklist = await client.hmGet("tokenService",`${token}`) 
    if(blacklist){
        return res.send("login again")
    }
jwt.verify(token,process.env.key,function(err,decode){
    if(err){
        res.send("plz login again")
    }else{
        next()
    }
})
}

module.exports={
    authenticate
}