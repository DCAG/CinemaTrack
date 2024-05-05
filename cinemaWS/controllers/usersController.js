const express = require('express')
const usersService = require("../services/usersService")

const router = express.Router()

router.get('/', async (req,res) => {
    try{
        const result = await usersService.getAll()
        res.send(result)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get('/:id', async (req,res) => {
    try{

        const {id} = req.params
        const result = await usersService.getById(id)
        res.send(result)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.post('/', async (req,res) => {
    try{
        const body = req.body;
        const result = await usersService.create(body)
        res.status(201).send(result)
    }
    catch(err){
        console.log(err)
        let statusCode = 400
        if(err.name=="ValidationError" || err.code == 11000){
            statusCode = 422
        }
        res.status(statusCode).send(err)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const result = await usersService.remove(id)
        res.send(result)
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.put('/:id', async (req,res) => {
    try {
        const objectToUpdate = req.body
        const {id} = req.params
        const result = await usersService.update(id,objectToUpdate)
        res.send(result)
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router