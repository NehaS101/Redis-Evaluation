const mongoose = require('mongoose');

const WeatherSchema = mongoose.Schema({
    cities:String
})

const WeatherModel = mongoose.model("weather",WeatherSchema)

module.exports={
    WeatherModel
}