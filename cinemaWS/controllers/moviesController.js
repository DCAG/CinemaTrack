const express = require('express')
const moviesService = require("../services/moviesService")

const router = express.Router()

router.get('/', async (req,res) => {
    try{
        const result = await moviesService.getAll()
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
        const result = await moviesService.getById(id)
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
        const result = await moviesService.create(body)
        res.status(201).send(result)
    }
    catch(error){
        console.log(error)
        if(error.response){
            res.status(error.response?.status??500).send(error.response?.data??error.response)
        }
        else{
            res.status(500).send(error)
        }
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const result = await moviesService.remove(id)
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
        const result = await moviesService.update(id,objectToUpdate)
        res.send(result)
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router