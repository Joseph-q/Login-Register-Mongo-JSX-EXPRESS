const express = require ("express");
const router = express.Router();

//Dependecies
const User = require("../models/user")
const bcrypt = require('bcryptjs');



router.get("/register",(req,res)=>{
    res.render("register")
})

router.post("/register",(req,res)=>{
    const{nombre, email, password,password2}=req.body


    let errors=[]
    if (!nombre|| !email || !password|| !password2){
        errors.push({msg:"rellena los campos requeridos"})
    }

    if (password.length < 6){
        errors.push({msg:"la constraseña debe ser de 6 caracteres"})
    }

    if (password!=password2){
        errors.push({msg:"Las contraseñas no coinciden"})
    }
    

    if (errors.length>0){
        res.render("register",{
            errors,
            nombre,
            email,
            password,
            password2
        })

    }else{
       User.findOne({email:email})
       .then(userExist => {
        if(userExist){
            errors.push({msg:"El usuario ya existe"})
            res.render("register",{
                errors,
                nombre,
                email,
                password,
                password2
            })
        }else{
            const newUser=new User({
                nombre:nombre,
                email,
                password
            })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if(err) throw err;
                    newUser.password=hash
                    newUser.save()
                    .then(
                        res.redirect("login")
                    )
                    
                });
            });
        }
       })
       
    }
})

router.get("/login",(req,res)=>{
    res.render("login");
})

router.post('/login',(req,res)=>{
    
})

module.exports=router