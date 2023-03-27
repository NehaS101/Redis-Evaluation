const express= require("express");
const UserRouter = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { UserModel } = require("../model/usermodel");
const { client } = require("../Redis Server/redis");

//creating user
UserRouter.post("/create",(req,res)=>{
    const {name,email,password}= req.body
    bcrypt.hash(password,6,async function(err,hash){
        const user = new UserModel({
            name,
            email,
            password:hash
        })
        await user.save()
        res.send({mssg:"signup successfully",details:user})
    })
})


//login
UserRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body

    const user = await UserModel.findOne({email})
    if(!user){
        res.send("please signup first")
    }

    const hashed = user.password

    bcrypt.compare(password,hashed,function(err,result){

        if(result){

            const token = jwt.sign({userId:user._id},process.env.key,{expiresIn:10800})

            res.send({msg:"login successfull",token:token})
        }else{
            res.send("login failed")
        }
    })
})

//logout

UserRouter.get("/logout",async(req,res)=>{

    const token = req.headers.authorization
    await client.hSet("tokenService",`${token}`)
    res.send("logout sucessfully")
})

module.exports={
    UserRouter
}
