const express = require("express")
// dotenv file must be imported right here not after require router
require('dotenv').config()
var cors = require('cors')
var app = express()
var path=require("path")
 app.use(cors())
 
const router =require("./routes/router")
const PORT = process.env.PORT || 8000

const corsOptions = {
  origin: [
    'https://medimartgo.vercel.app',     // ← Your Vercel frontend
    'http://localhost:3000',             // ← For local development
    'http://127.0.0.1:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,                     // Important if you use tokens
};

app.use(cors(corsOptions));

// Handle preflight requests (OPTIONS)
app.options('*', cors(corsOptions));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
app.use("/api",router)
app.set(express.static("./public"))
app.use("/public",express.static("public"))
app.use('*', express.static(path.join(__dirname, 'build')))
require("./dbConnect")
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})