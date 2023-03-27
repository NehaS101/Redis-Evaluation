const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
	windowMs: 3 * 60 * 1000, 
	max: 1, 
	standardHeaders: true, 
	legacyHeaders: false, 
})


module.exports={
	limiter
}