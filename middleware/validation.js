const validate = (req,res,next)=>{
if(isString(req.params.city) === true){
    next()
}else{
    return res.send("check city name")
}
}

module.exports={
    validate
}