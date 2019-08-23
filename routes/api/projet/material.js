var controller = require("@controllers/materielsController")
var express = require('express')
var router = express.Router()

router.get('/:matId',(req,res)=> controller.getOne(res,req.projetId,req.param("matId")))

router.get('/', (req,res) => controller.get(res,req.projetId))

router.post('/',(req,res)=> controller.create(res,req.projetId,req.body))

router.put('/:matId',(req,res)=> controller.update(res,req.projetId,req.param("matId"),req.body))

router.delete('/:matId', (req,res)=>  controller.delete(res,req.projetId,req.param("matId")))

module.exports = router
