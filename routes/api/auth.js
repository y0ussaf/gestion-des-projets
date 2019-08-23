var express = require('express')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var router = express.Router()
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{session:false},function (err,user,info) {
       if (err) return  res.status(401).json({err})
        const payload = {
            info:user,
            expires : Date.now() + 7 * 24 * 60 * 60 * 1000
        }
        req.login(payload,{session:false},function (err) {
            if (err) return res.status(400).json({err})
            var token = jwt.sign(JSON.stringify(payload),"youssef")
            res.cookie('jwt',token,{httpOnly:true})
            res.status(200).send({user})
        })
    })(req,res,next)
})
module.exports = router
