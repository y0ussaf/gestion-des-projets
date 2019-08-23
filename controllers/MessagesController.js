var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId
var Conversation = mongoose.model('Conversation')
var helpers = require('./helpers')
var handler = helpers.handler
 exports.get = function (res,conversationId) {
    Conversation.findById(conversationId).populate("participants","nom").populate("messages.author","nom ")
        .exec((err,docs)=>{
        handler(err,docs,res)})
}
// creer un message
exports.create  = function (res,_id,userId,content) { // _id : conversation id
    Conversation.findOneAndUpdate({_id},{$push:{messages: {content,author:userId}}},{new:true})
        .exec((err,docs)=>handler(err,docs,res))

}

exports.update = function (res,_id,userId) {
    Conversation.update({_id,participants:userId},{$push: {
        "messages.$[elm].readInfo": {
            readBy: userId,
            readAt: Date.now()
        }
        }},{multi:true,arrayFilters:[
            { "elm.readInfo.readBy":{$ne:ObjectId(userId)},
            "elm.author":{$ne: ObjectId(userId)}}
        ]})
        .exec(function (err,docs) {
            if (err) return console.log(err)
            handler(null,docs,res)
        })
}

