const redis = require('redis');
const client = redis.createClient({
    legacyMode:true
})
client.on('error',err => console.log('Redis client Error',err))
client.connect()
.then(async(res)=>{
    console.log("connected to redis server")
})

module.exports={
    client
}