var mongoose = require('mongoose')
var Projet = mongoose.model('Projet')
var helpers = require('./helpers')
var handler = helpers.handler
var ObjectId = mongoose.Types.ObjectId

exports.getOne = function (res,projetId,matId) {
    Projet.aggregate([
        {$match: {_id:ObjectId(projetId)}},
        {$project:{
                materiels:{
                    $filter: {
                        input: "$materiels",
                        as: "item",
                        cond: {$eq:["$$item._id",ObjectId(matId)]}
                    }
                },
                _id:0
            }},
        {$project:{
                task:{$arrayElemAt:["$materiels",0]}
            }}
    ]).exec((err,docs)=> handler(err,docs,res))
}

exports.get = function (res,projetId) {
    Projet.find({_id:projetId},{materiels: 1})
        .exec((err,docs)=> handler(err,docs,res))
}

exports.create = function (res,projetId,body) {
    Projet.findById(projetId).exec(function (err,doc) {
        if (err) handler(err,null,res)
        doc.materiels.push(body)
        let materiel = doc.tasks[0]
        doc.save((err)=> handler(err,materiel,res))
    })

}

exports.update = function (res,projetId,matId,body) {
    Projet.findOneAndUpdate({_id:projetId,"materiels._id":matId},{
            "materiels.$.nom": body.nom,
            "materiels.$.description":body.prix,
            "materiels.$.etat":body.quantite
        }
        ,{new:true,omitUndefined:true})
        .exec((err,docs)=> handler(err,docs,res))
}

exports.delete = function (res,projetId,matId) {
    Projet.findById(projetId).exec(function (err,doc) {
        if (err) handler(err,null,res)
        doc.materiels.id(matId).remove()
        doc.save((err)=> handler(err,doc,res))
    })
}
