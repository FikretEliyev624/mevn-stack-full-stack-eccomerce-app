const router=require('express').Router()
const {getProducts,createProducts,getAllProducts}=require('../controllers/product')

router.post('/create',createProducts)
router.get('/',getProducts)
router.get('/all',getAllProducts)

module.exports=router