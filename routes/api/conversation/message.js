var express = require('express')
var router = express.Router()
var controller = require('@controllers/MessagesController')
router.get('/',(req,res)=>controller.get(res,req.conversationId))
router.put('/',(req,res)=> controller.update(res,req.conversationId,req.user.info._id))
router.post('/',(req,res)=>controller.create(res,req.conversationId,req.user.info._id,req.body.content))

module.exports = router
