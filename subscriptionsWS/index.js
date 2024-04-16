// configuration and app data
const connectDB = require('./configs/db')
const loadExternalData = require('./bin/loadData')

// server and middleware
const express = require('express')
const cors = require('cors')
// controllers
//const REPLACE_MEController = require('./controllers/REPLACE_MEController')

connectDB()
loadExternalData()

const app = express()
 
app.use(cors())
app.use(express.json())
//app.use('/REPLACE_ME', REPLACE_MEController);

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`node server running: http://localhost:${PORT}`)
})
