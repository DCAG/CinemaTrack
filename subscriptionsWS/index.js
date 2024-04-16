// configuration and app data
const connectDB = require('./configs/db')
const loadExternalData = require('./bin/loadData')

// server and middleware
const express = require('express')
const cors = require('cors')
// controllers
const subscriptionController = require('./controllers/subscriptionController')
const movieController = require('./controllers/movieController')
const memberController = require('./controllers/memberController')

connectDB()
loadExternalData()

const app = express()
 
app.use(cors())
app.use(express.json())
app.use('/subscription', subscriptionController);
app.use('/movie', movieController);
app.use('/member', memberController);

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`node server running: http://localhost:${PORT}`)
})
