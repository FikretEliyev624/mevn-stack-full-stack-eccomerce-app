const router=require('express').Router()
const {signin,signup}=require('../controllers/user')
router.post('/signup',signup)
router.post('/signin',signin)

module.exports=router
