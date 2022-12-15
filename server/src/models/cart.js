const mongoose=require("mongoose")

const CartSchema=mongoose.Schema({
    owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        items: [{
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            category:String,
        
            name:String,
        
            quantity:{
                type:Number,
                min:1,
                default:1
            },
            price: {
                type: Number,
                required: true
            },
            image:String,
        }],
    subTotal: {
        default: 0,
        type: Number
    }
    })

    // CartSchema.methods.toJSON = function() {
    //     let cart = this.toObject();
    //     delete cart.owner;
    //     return cart;
    //    }
    module.exports=mongoose.model('Cart',CartSchema)