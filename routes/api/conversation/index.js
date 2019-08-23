var controller = require('@controllers/ConversationsController')
var messagesRouter = require('./message')
var express = require('express')
var router = express.Router()

router.post('/',(req,res)=> {
    req.body.participants.push(req.user.info._id)
    controller.create(res,req.body.participants)
})

router.get('/',(req,res)=> controller.get(res,req.user.info._id))

router.get('/:id',(req,res)=> controller.getOne(res,req.params.id))

router.post('/:id/participants',(req,res) => controller.addParticipant(res,req.params.id,req.body.participantId))

router.delete('/:id/participants',(req,res)=> controller.deleteParticipant(res,req.params.id,req.body.participantId))

router.use('/:id/messages',(req,res)=> {
    req.conversationId = req.params.id
    messagesRouter(req,res)
})
module.exports = router
