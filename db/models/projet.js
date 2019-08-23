var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var projetSchema = new Schema({
    nom:{type:String,required:true},
    description:{type: String,required: true},
    chef:ObjectId,
    etat:{type:String,default: "en_cours"},
    tasks:[
        new Schema({
            nom:{
                type:String,required:true
            },
            description:String,
            etat:{type:String,default:"en_cours"}
        },{timestamps : {createdAt: 'created_at'}})
    ],
    materiels:[
        new Schema({
            nom:{
                type:String,required:true
            },
            prix:{
                type:Number,required:true
            },
            quantite: {
                type: Number, required: true
            }
        })
    ]
})
mongoose.model('Projet',projetSchema)
