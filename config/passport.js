const LocalStrategy=require("passport-local").Strategy
const mongoose=require("mongoose")
const bcrypt =require("bcryptjs")

//Load User Model
const User = require("../models/user")


module.exports=function (passport) {
    passport.use(
        new LocalStrategy({usernameField:"email"},(email,password,done)=>{
            User.findOne({email:email})
            .then(user=>{
                if (!user){
                    return done(null, false,{message:"That emial is not register"})
                }
                bcrypt.compare(password,user.password,(err,IsMatch)=>{
                    if (err) throw err

                    if (IsMatch){
                        return done(null,user)
                    }else{
                        return done(null, false,{message:"Incorrect password"})
                    }

                })
            })
            .catch(err=>console.log(err))
        })
    )

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser((id,done)=>{
        User.findById(id)
        .then(
            user=>{
                done(null,user)
            }
        )
        .catch(
            (err,user)=>{
                done(err,user)
            }
        )
    })
    
}