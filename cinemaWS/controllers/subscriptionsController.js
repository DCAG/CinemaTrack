const express = require('express')
const subscriptionsService = require("../services/subscriptionsService")

const router = express.Router()

router.get('/', async (req,res) => {
    try{
        const result = await subscriptionsService.getAll()
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
        const result = await subscriptionsService.getById(id)
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
        const result = await subscriptionsService.create(body)
        res.status(201).send(result)
    }
    catch(err){
        console.log(err)
        let statusCode = 400;
        if(err.code === "ERR_BAD_REQUEST" && err.response){
            statusCode = err.response.status
            err = err.response.data
        }
        res.status(statusCode).send(err)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const result = await subscriptionsService.remove(id)
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
        const result = await subscriptionsService.update(id,objectToUpdate)
        res.send(result)
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router