const express = require ("express");
const db = require ("./config/db")
const expressLayouts= require ("express-ejs-layouts")
const app = express()

const PORT= process.env.PORT || 3000;
//body parser
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//views
app.use(expressLayouts)
app.set('view engine', 'ejs');

//routes
app.use("/",require("./routes/index"))
app.use("/user",require("./routes/user"))

//conexion a la base datos
db("mongodb://127.0.0.1:27017/myweb")

//app
app.listen(PORT,()=>{
    console.log("Listening on PORT: " + PORT)
})
