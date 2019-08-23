var mongoose = require('mongoose')
var Conversation = mongoose.model("Conversation")
var ObjectId = mongoose.Types.ObjectId
var helpers = require('./helpers')
var handler = helpers.handler

// get the conversations of current user
exports.get = function (res,userId) {
    Conversation.find({participants: userId}).populate("participants","nom prenom").select({"participants":1})
        .exec((err,docs)=>handler(err,docs,res))
}
// create a new conversation
exports.create = function (res,participants) {
    console.log(participants)
    let conversation = new Conversation({participants})
    conversation.save((err,docs)=>handler(err,docs,res))
}
// delete a conversation
exports.delete = function (res,_id) {
    Conversation.deleteOne({_id}).exec((err,docs)=>handler(err,docs,res))
}
// add a participant to a conversation
exports.addParticipant  = function (res,_id,participantId) {
    Conversation.findOneAndUpdate({_id},{$push:{participants: participantId}},{new:true})
        .exec((err,docs)=>handler(err,docs,res))

}
// delete a participant from a conversation
exports.deleteParticipant = function (res,_id,participantId) {
    Conversation.updateOne({_id},{$pull:{participants:ObjectId(participantId)}})
        .exec((err,docs)=>handler(err,docs,res))

}
