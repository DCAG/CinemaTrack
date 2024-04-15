const express = require('express')
const jwt = require('jsonwebtoken')
const REPLACE_MEService = require('../services/REPLACE_MEService')

const router = express.Router()

// inside: /auth/
router.post('/login', async (req,res) => {
    const {username, password} = req.body

    console.log("location[/auth/login]")

    if(await usersService.verifyCredentials(username, password)){
        const user = (await REPLACE_MEService.get(username))
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

module.exports = router