module.exports={
    autenticated: function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect("/")
    }
}