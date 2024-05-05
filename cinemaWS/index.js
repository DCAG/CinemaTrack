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
const permissionsauth = require('./middleware/permissionsauth')

const app = express()
connectDB()

init()


app.use(cors())
app.use(express.json())
app.use('/auth', authController);
//app.use('/REPLACE_ME', jwtauth, REPLACE_MEController);
app.use('/movies', jwtauth, permissionsauth, moviesController);
app.use('/members', jwtauth, permissionsauth, membersController);
app.use('/subscriptions', jwtauth, permissionsauth, subscriptionsController);
app.use('/users', jwtauth, permissionsauth, usersController);

const PORT = process.env.SERVER_PORT
app.listen(PORT,()=>{
    console.log(`node server running: http://localhost:${PORT}`)
})
