
const express = require('express');
const { connection } = require('./config/db');
const { UserRouter } = require('./Routes/user');
const { WeatherRouter } = require('./Routes/weather');
require("dotenv").config();


const app = express()


app.use(express.json())
app.use("/user",UserRouter)
app.use("/weather",WeatherRouter)


app.get("/",(req,res)=>{
    res.send("home")
})
//server listening
app.listen(process.env.port,async(req,res)=>{
try {
    await connection
    console.log("connected to db")
} catch (error) {
    console.log("error while connecting to db")
}

    console.log(`running on port ${process.env.port}`)
})