var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var conversationSchema = new Schema({
    participants: [{type:ObjectId,ref:"User"}],
    messages:[
        new Schema({
            author: {type:ObjectId,ref:"User"},
            content: String,
            readInfo : [new Schema({
                readAt : {type:Date},
                readBy:{type:ObjectId,ref:"User"},
            })]
        },{timestamps : {createdAt: 'created_at'}})
    ]
})
mongoose.model('Conversation',conversationSchema)
