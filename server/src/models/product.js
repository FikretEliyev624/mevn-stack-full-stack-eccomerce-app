const mongoose=require("mongoose")

const ProductSchema=mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    specifications:{
        type:Object,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:String

})
module.exports=mongoose.model('Product',ProductSchema)