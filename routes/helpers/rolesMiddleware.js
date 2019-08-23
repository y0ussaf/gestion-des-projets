var mongoose = require('mongoose')
var Projet = mongoose.model("Projet")
var User = mongoose.model('User')
exports.chefMidd = function (req,res,next) {
    if (req.user.info.role === "chef") return next()
    res.status(401).json("not authorized")
}
exports.chefProjetMidd = function (req,res,next) {
    if (["chef","chef de projet"].includes(req.user.info.role)) return next()
    res.status(401).json("not authorized")
}
exports.ProjetMidd = function (req,res,next) {
    var { info } =req.user
    if (info.role === "chef") return next()
    if (info.role === "chef de projet") {
        Projet.findOne({_id:req.params.id,chef:info._id},{_id:1},function (err,doc) {
            if (err) return res.json({err:"something wrong"})
            if (doc) return next()
            res.status(401).json("not authorized")
        })
    }else{
        res.status(401).json("not authorized")
    }
}
exports.UserMidd = function (req,res,next) {
    var {info} = req.user
    if (info.role === "chef") return next()
    if (info._id === req.params.id) return next()
    res.status(401).json("not authorized")
}
