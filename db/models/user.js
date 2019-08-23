var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var userSchema = new Schema({
    nom:{type:String,required:true,maxlength:20,minlength:3},
    prenom:{type: String,required: true,maxlength: 20,minlength: 3},
    role:{type: String,enum:["chef","chef de projet","ouvrier"]},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
userSchema.pre('save',async function  (next){
    if (this.password && this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password,10)
            next()
        }catch (e) {
            next(e)
        }
    }else {
        next()
    }
})
mongoose.model("User",userSchema)
