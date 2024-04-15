const express = require('express')
const cors = require('cors')

const jwtauth = require('./middleware/jwtauth')
//const connectDB = require('./configs/db')

const authController = require('./controllers/authController')
const REPLACE_MEController = require('./controllers/REPLACE_MEController')

const app = express()

//connectDB()
 
app.use(cors())
app.use(express.json())
app.use('/auth', authController);
app.use('/REPLACE_ME', jwtauth, REPLACE_MEController);

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`node server running: http://localhost:${PORT}`)
})
