const express= require('express')
const { authenticate } = require('../middleware/authenticate')
const { client } = require('../Redis Server/redis')
const WeatherRouter = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const winston = require('winston')
const expressWinston= require('express-winston');
const { WeatherModel } = require('../model/weathermodel');
const { validate } = require('../middleware/validation');
const { limiter } = require('../middleware/limiter');
require('winston-mongodb')
require("dotenv").config()

//middlewares

WeatherRouter.use(limiter,authenticate,validate)

//winston
WeatherRouter.use(expressWinston.logger({
    transports: [
     
      new winston.transports.MongoDB({
        level:"error",
        db:`${process.env.Db}/logs`
      }),
    ],
format:winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
)

})); 
//showing weather
WeatherRouter.get("/showWeather:/city",async(req,res)=>{

    const city = req.params.city;
    const data = await client.get("cityData" ,`${city}`)
if(data){
    res.send(data)
}else{
    let citydata= await fetch(`https://api.openweathermap.org/data/2.5/weather/${city}`).then((res)=>res.json())
    await client.set("cityData",`${city}`,EX,1800)
    res.send(citydata)
   

}
    res.send("data showed successfully")
    
    //storing to db
    const weatherData = new WeatherModel(data)
    await weatherData.save();

})

module.exports={
    WeatherRouter
}