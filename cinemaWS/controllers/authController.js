const express = require('express')
const jwt = require('jsonwebtoken')
const usersService = require('../services/usersService')
const errorMessages = require('../utils/errorMessages')

const router = express.Router()

// inside: /auth/
router.post('/login', async (req,res) => {
    const {username, password} = req.body

    if(await usersService.verifyCredentials(username, password)){
        const user = (await usersService.getByUsername(username))
        const JWT_SECRET = process.env.JWT_SECRET
        const token = jwt.sign(
            {user},
            JWT_SECRET,
            {expiresIn:`${user.sessionTimeout}m`}
        );
        res.send({accessToken: token, user: user})
    }
    else{
        res.status(403).send(errorMessages.USER_LOGIN_FAILED_WRONG_CREDENTIALS)
    }
})

router.post('/createaccount', async (req,res) => {
    try{
        const body = req.body;
        const result = await usersService.createaccount(body)
        res.status(201).send(result)
    }
    catch(error){
        console.log(error)
        switch(error.name){
            case errorMessages.USER_PASS_EMPTY.name:
            case errorMessages.USER_NOT_EXIST.name:
                res.status(error.statusCode).send(error.message)
                break;
            default: 
                res.status(418).send(error)
                break;
        }
    }
})

module.exports = router