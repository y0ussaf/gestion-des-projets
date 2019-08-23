var mongoose = require('mongoose')
var Projet = mongoose.model('Projet')
var helpers = require('./helpers')
var handler = helpers.handler

exports.get = function (res,query,currentUser) {
    let {role,_id} = currentUser
    let {chef,etat} = query
    if (role === "chef de projet") chef = _id
    let filters = {chef,etat}
    helpers.omitUndefined(filters)
    console.log(filters)
    Projet.find(filters,{nom:1,description:1,chef:1,etat: 1})
        .exec((err,docs)=> handler(err,docs,res))
}
exports.getOne = function(res,_id){
    Projet.find({_id}).exec((err,docs)=> handler(err,docs,res))
}
exports.delete = function (res,_id) {
    Projet.deleteOne({_id}).exec((err,docs)=> handler(err,docs,res))
}
exports.create = function (res,body) {
    let projet = new Projet(body)
    projet.save((err,docs) =>handler(err,docs,res))
}

exports.update = function (res,_id,body) {
    let {nom,description,chef,etat} = body
    Projet.findOneAndUpdate({_id},{nom,description,chef,etat},{omitUndefined:true,new:true})
        .exec((err,docs) => handler(err,docs,res))
}
