const cartModel=require('../models/cart')
const productModel=require('../models/product')

const getCarts=async(req,res)=>{
    const owner = req.userId;
    try {
        const cart=await cartModel.findOne({owner})
        if (cart && cart.items.length > 0) {
            res.status(200).send(cart);
       } else {
             res.send(null);
       }
    } catch (error) {
        console.log(error);
    }
}
const createCart=async(req,res)=>{
    const owner = req.userId;
    const { productId, quantity } = req.body;
    try {
        const cart = await cartModel.findOne({ owner });
        const product = await productModel.findOne({ _id: productId });
        if (!product) {
            res.status(404).send({ message: "Product not found" });
            return;
        }
        const price = product.price;
        const name = product.name;
        const image = product.image;
        const category = product.category;
        if (cart) {
            const productIndex = cart.items.findIndex((item) => item.productId ==  productId);

            if (productIndex > -1) {
                let Product = cart.items[productIndex];
                Product.quantity += quantity;
                cart.subTotal = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
               },0)
            cart.items[productIndex] = Product;
               await cart.save();
               res.status(200).send(cart);
            }else {
                cart.items.push({ productId, name, quantity, price ,image , category });
                cart.subTotal = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
             },0)
                await cart.save();
                res.status(200).send(cart);
             }
        }else {
            const newCart = await cartModel.create({
               owner,
               items: [{ productId, name, quantity, price, image , category }],
               subTotal: quantity * price,
            });
            return res.status(201).send(newCart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}
const deleteCart=async(req,res)=>{
    const owner = req.userId;
    const {productId} = req.body;
try {
    let cart = await cartModel.findOne({ owner });
   const productIndex = cart.items.findIndex((item) => item.productId == productId);
   if (productIndex > -1) {
    let Product = cart.items[productIndex];
    cart.subTotal -= Product.quantity * Product.price;
if(cart.subTotal < 0) {
     cart.subTotal = 0
}
    cart.items.splice(productIndex, 1);
    cart.subTotal = cart.items.reduce((acc, curr) => {
return acc + curr.quantity * curr.price;
},0)
   cart = await cart.save();
   res.status(200).send(cart);
} else {
   res.status(404).send("item not found");
}
} catch (error) {
    console.log(error);
    res.status(400).send();
}
}
const emptyCart=async(req,res)=>{
    const owner = req.userId;
    try {
        let cart = await cartModel.findOne({ owner });
        cart.items=[]
        cart.subTotal=0
        cart = await cart.save();
        res.status(200).send(cart);
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}
const updateCart=async(req,res)=>{
    const owner = req.userId;
    const {productId,quantity} = req.body;
    try {
        let cart = await cartModel.findOne({ owner });
        cart.items.findOneAndUpdate({productId:productId},{
            $set:{
                quantity
            }
        })
        cart = await cart.save();
        res.status(200).send(cart);
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}

module.exports={getCarts,createCart,deleteCart,emptyCart,updateCart}