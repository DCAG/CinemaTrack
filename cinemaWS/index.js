// server
const express = require('express')
// middleware
const cors = require('cors')
const jwtauth = require('./middleware/jwtauth')
// configs and init scripts
const connectDB = require('./configs/db')
const init = require('./bin/init')

// controllers
const authController = require('./controllers/authController')
const membersController = require('./controllers/membersController')
const moviesController = require('./controllers/moviesController')
const subscriptionsController = require('./controllers/subscriptionsController')
const usersController = require('./controllers/usersController')

const app = express()
connectDB()

init()


app.use(cors())
app.use(express.json())
app.use('/auth', authController);
//app.use('/REPLACE_ME', jwtauth, REPLACE_MEController);
app.use('/members', jwtauth, membersController);
app.use('/movies', jwtauth, moviesController);
app.use('/subscriptions', jwtauth, subscriptionsController);
app.use('/users', jwtauth, usersController);

const PORT = process.env.SERVER_PORT
app.listen(PORT,()=>{
    console.log(`node server running: http://localhost:${PORT}`)
})
