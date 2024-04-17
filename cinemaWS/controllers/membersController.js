const express = require('express')
const membersService = require("../services/membersService")

const router = express.Router()

router.get('/', async (req,res) => {
    try{
        const result = await membersService.getAll()
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
        const result = await membersService.getById(id)
        res.send(result)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.post('/create', async (req,res) => {
    try{
        const body = req.body;
        const result = await membersService.create(body)
        res.status(201).send(result)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const result = await membersService.remove(id)
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
        const result = await membersService.update(id,objectToUpdate)
        res.send(result)
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router