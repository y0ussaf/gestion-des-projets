var passport = require('passport/lib')
var mongoose = require('mongoose')
var localStr = require('passport-local/lib').Strategy
var passportJWT = require('passport-jwt/lib')
var JWTStr = passportJWT.Strategy
var bcrypt = require('bcrypt')
var secret = "youssef"
var User = mongoose.model('User')
passport.use(new localStr({
    usernameField: "email",
    passwordField: "password",
},async  (email,password,done)=>{
    var msgErr = 'Incorrect combinainson'
    try {
        console.log(password)
        var user = await User.findOne({email}).exec()
        var match;
        if (user) {
             match = await bcrypt.compare(password,user.password)
        }
        else return done(msgErr)
        if (match) return done(null,user)
        else return done(msgErr)
    }catch (error) {
        done(error)
    }
}))
passport.use(new JWTStr({
    jwtFromRequest: req=> req.cookies.jwt,
    secretOrKey:secret
},
    (jwtPayload,done)=>{
    if (Date.now() > jwtPayload.expires) {
        return done('expired')
    }
    return done(null,jwtPayload)
    }
    ))
