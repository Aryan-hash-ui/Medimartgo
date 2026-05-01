const express = require("express")
// dotenv file must be imported right here not after require router
require('dotenv').config()
var cors = require('cors')
var app = express()
var path=require("path")
 app.use(cors())
 
const router =require("./routes/router")


app.use(cors({
  origin: "https://medimartgo.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
app.use("/api",router)
app.set(express.static("./public"))
app.use("/public",express.static("public"))
app.use('*', express.static(path.join(__dirname, 'build')))
require("./dbConnect")
let port = process.env.PORT || 8000
app.listen(port,()=>console.log(`Server is Running at https://medimartgo.onrender.com`))