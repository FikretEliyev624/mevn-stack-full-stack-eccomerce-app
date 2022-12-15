const router=require('express').Router()
const {contactUs}=require('../controllers/mail')

router.post('/contact',contactUs)

module.exports=router