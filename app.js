const express = require ("express");
const expressLayouts= require ("express-ejs-layouts")
const passport =require ("passport")
const session= require("express-session")

//passport config
require("./config/passport")(passport);


const db = require ("./config/db")



const app = express()


//conexion a la base datos
db("mongodb://127.0.0.1:27017/myweb")



//views
app.use(expressLayouts)
app.set('view engine', 'ejs');

//body parser
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//session
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true,
}))

//passport
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('session'));







//routes
app.use("/",require("./routes/index"))
app.use("/user",require("./routes/user"))

//Puerto
const PORT= process.env.PORT || 3000;

//app
app.listen(PORT,()=>{
    console.log("Listening on PORT: " + PORT)
})
