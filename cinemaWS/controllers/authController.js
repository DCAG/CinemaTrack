const express = require('express')
const jwt = require('jsonwebtoken')
const usersService = require('../services/usersService')

const router = express.Router()

// inside: /auth/
router.post('/login', async (req,res) => {
    const {username, password} = req.body

    console.log("location[/auth/login]") 

    if(await usersService.verifyCredentials(username, password)){
        const user = (await usersService.getByUsername(username))
        console.log("location[/auth/login]/user.id", user.id)
        const JWT_SECRET = process.env.JWT_SECRET
        const token = jwt.sign(
            {user},
            JWT_SECRET,
            {expiresIn:"2h"}
        );
        console.log("accessToken", token)
        res.send({accessToken: token, user: user})
    }
    else{
        console.log("location[/auth/login]/error403:wrong credentials")
        res.status(403).send("wrong credentials")
    }
})

router.post('/createaccount', async (req,res) => {
    try{
        const body = req.body;
        const result = await usersService.createaccount(body)
        res.status(201).send(result)
    }
    catch(err){
        console.log(err)
        switch(err.name){
            case 'USER_PASS_EMPTY':
            case 'USER_NOT_EXIST':
                res.status(err.statusCode).send(err.message)
                break;
            default: 
                res.status(404).send(err)
                break;
        }
    }
})

module.exports = router