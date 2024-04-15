const express = require('express')
const REPLACE_MEService = require("../services/REPLACE_MEService")

const router = express.Router()

router.get('/', async (req,res) => {
    try{
        const REPLACE_ME = await REPLACE_MEService.getAll()
        res.send(REPLACE_ME)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get('/:id', async (req,res) => {
    try{

        const {id} = req.params
        const REPLACE_ME = await REPLACE_MEService.getById(id)
        res.send(REPLACE_ME)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.post('/create', async (req,res) => {
    try{
        const body = req.body;
        const REPLACE_ME = await REPLACE_MEService.create(body)
        res.status(201).send(REPLACE_ME)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const result = await REPLACE_MEService.remove(id)
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
        const result = await REPLACE_MEService.update(id,objectToUpdate)
        res.send(result)
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router