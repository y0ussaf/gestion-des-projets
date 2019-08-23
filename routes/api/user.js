var express = require('express')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var helpers = require('../helpers/rolesMiddleware')
var chefMidd = helpers.chefMidd
var userMidd = helpers.UserMidd
var router = express.Router()
var handler = (err,res,docs) => {
    if (err) return res.json({err})
    res.json({docs})
}
router.get('/',chefMidd, (req,res)=> {
    User.find({}, (err,docs)=>handler(err,res,docs))
})
router.get('/:id',userMidd,(req,res)=>{
    var _id = req.params.id
    User.find({_id},(err,docs)=>handler(err,res,docs))
})
router.post('/',chefMidd,(req,res)=>{
    var user = new User(req.body)
    user.save((err,docs)=>handler(err,res,docs)
    )
})
router.put('/:id',userMidd,(req,res)=>{
    var _id = req.params.id
    User.findOneAndUpdate({_id},req.body,{omitUndefined:true,new:true},(err,docs)=>handler(err,res,docs))
})
router.delete('/:id',chefMidd, (req,res) =>{
    var _id = req.params.id
    User.deleteOne({_id}, (err,docs) =>handler(err,res,docs))
})
module.exports = router
