var mongoose = require('mongoose')
var Projet = mongoose.model('Projet')
var helpers = require('./helpers')
var handler = helpers.handler
var ObjectId = mongoose.Types.ObjectId

exports.get = function (res,projetId,query) {
    let {etat} = query
    if(etat){
        return Projet.aggregate([
            {$match: {_id: ObjectId(projetId)}},
            {$project:{tasks:{
                        $filter:{
                            input: "$tasks",
                            as:"item",
                            cond:{$eq:["$$item.etat",etat]}}
                    }
                }}
        ]).exec((err,docs) => handler(err,docs,res))
    }
    Projet.find({_id:projetId},{tasks:1})
        .exec((err,docs) => handler(err,docs,res))
}

exports.getOne = function (res,projetId,taskId) {
    Projet.aggregate([
        {$match: {_id:ObjectId(projetId)}},
        {$project:{
                tasks:{
                    $filter: {
                        input: "$tasks",
                        as: "item",
                        cond: {$eq:["$$item._id",ObjectId(taskId)]}
                    }
                },
                _id:0
            }},
        {$project:{
                task:{$arrayElemAt:["$tasks",0]}
            }}
    ]).exec((err,docs)=>{
        handler(err,docs,res)
    })
}

exports.update = function (res,body,projetId,taskId) {
    Projet.findOneAndUpdate({_id:projetId,"tasks._id":taskId},{
            "tasks.$.nom": body.nom,
            "tasks.$.description":body.description,
            "tasks.$.etat":body.etat
        }
        ,{new:true,omitUndefined:true})
        .exec((err,docs)=> handler(err,docs,res))
}

exports.create = function (res,projetId,body) {
    Projet.findById(projetId).exec(function (err,doc) {
        if (err) handler(err,null,res)
        doc.tasks.push(body)
        let task = doc.tasks[0]
        doc.save((err)=> handler(err,task,res))
    })
}

exports.delete = function (res,projetId,taskId) {
    Projet.findById(projetId).exec(function (err,doc) {
        if (err) handler(err,null,res)
        doc.tasks.id(taskId).remove()
        doc.save((err)=> handler(err,doc,res))
    })
}
