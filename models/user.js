const mongoose = require('mongoose');
const {Schema} =require("mongoose")

const userSchema= new Schema({
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now,
    }
})

const user= mongoose.model('user',userSchema );

module.exports=user
