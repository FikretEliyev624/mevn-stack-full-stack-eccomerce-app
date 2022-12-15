const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    }
})
module.exports=mongoose.model('User',UserSchema)