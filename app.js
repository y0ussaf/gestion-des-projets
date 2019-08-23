require('module-alias/register')
var express = require('express')
var cors = require('cors')
var logger = require('morgan')
var http = require('http')
var cookiesParser = require('cookie-parser')
var path = require('path')
var bodyParser = require('body-parser')
require('./db')
require('./config/passportSetup')
var mongoose = require('mongoose')
var passport = require('passport')
var apiRouter = require('./routes/api')
var app = express();
var server = http.createServer(app)
app.use(cors({
    origin:'http://localhost:30001'
}))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookiesParser())
app.get('/',function (req,res) {
    var User = mongoose.model('User')
    var user = new User({nom:"douirek",prenom: "youssef",email:"you@gmail.com",role:"chef",password:"0000"})
    user.save(function (err) {
        if (err) return res.json({err})
        res.json({ok:"ok"})
    })
})
app.use('/api',apiRouter)
server.listen(3000,"localhost")
