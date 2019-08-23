var controller = require("@controllers/projetsController")
var express = require('express')
var router = express.Router()
var helpers = require('../../helpers/rolesMiddleware')
var chefMidd = helpers.chefMidd
var ProjetMidd = helpers.ProjetMidd
var chefProjetMidd = helpers.chefProjetMidd
var materielsRouter = require('./material')
var tasksRouter = require('./task')
router.all('*',chefProjetMidd)
router.get('/',(req,res)=> controller.get(res,req.query,req.user.info))

router.delete('/:id',chefMidd, (req,res) => controller.delete(res,req.param("id")))


router.post('/', chefMidd, (req,res)=> controller.create(res,req.body))

router.put('/:id',ProjetMidd, (req,res)=> controller.update(res,req.param('id'),req.body))

router.get('/:id',ProjetMidd, (req,res) => controller.getOne(res,req.param('id')))

router.use('/:id/tasks',ProjetMidd,(req,res,next)=>{
    req.projetId = req.params.id
    next()
},tasksRouter)

router.use('/:id/materiels',ProjetMidd,(req,res,next)=>{
    req.projetId = req.params.id
    next()
},materielsRouter)

module.exports = router
