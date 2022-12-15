const router=require('express').Router()
const {getCarts,createCart,deleteCart,emptyCart,updateCart}=require('../controllers/cart')

router.post('/create',createCart)
router.get('/',getCarts)
router.delete('/delete-cart',deleteCart)
router.delete('/empty-cart',emptyCart)
router.patch('/update-cart',updateCart)

module.exports=router