var controller = require("@controllers/tasksController")
var express = require('express')
var router = express.Router()

router.get('/:taskId',(req,res)=>controller.getOne(res,req.projetId,req.param("taskId")))

router.get('/', (req,res) =>controller.get(res,req.projetId,req.query))

router.put('/:taskId', (req,res)=> controller.update(res,req.body,req.projetId,req.param("taskId")))

router.post('/',(req,res)=> controller.create(res,req.projetId,req.body))

router.delete('/:taskId', (req,res)=> controller.delete(res,req.projetId,req.param("taskId")))

module.exports = router
