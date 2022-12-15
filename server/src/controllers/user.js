const userModel=require('../models/user')
const bcrypt=require('bcrypt')
const Joi=require('@hapi/joi')
const jwt=require('jsonwebtoken')


const signupSchema=Joi.object({
    username:Joi.string().required().min(3).max(255),
    email:Joi.string().required().min(6).max(255),
    password:Joi.string().required().min(6).max(255)
})
const signinSchema=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()
})



const signup=async(req,res)=>{
    const {username,email,password,confirmation}=req.body
    const {error}=signupSchema.validate({username,email,password})
    if(error){
        res.status(400).send(error.details[0].message)
        return
    }
    try {
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.status(400).send('User already exists')
        }
        if(confirmation===password){
            const hashedPassword=await bcrypt.hash(password,12)
            const result=userModel.create({
                username,
                email,
                password:hashedPassword
            })
            const token=jwt.sign({email:result.email,id:result._id},process.env.SECRET_KEY)
            res.status(201).json({user:result,token})
        }
        else{
            res.status(400).send('confirmation password does not match')
        }
        



    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong')
    }
}
const signin=async(req,res)=>{
        const {email,password}=req.body
        const {error}=signinSchema.validate({email,password})
    if(error){
        res.status(400).send(error.details[0].message)
        return
    }
    try {
        const existingUser=await userModel.findOne({email})
        if(!existingUser){
            return res.status(400).send('User not found')
        }
        const matchPassword=await bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
            return res.status(400).send('invalid credentials')
        }
        const token=jwt.sign({email:existingUser.email,id:existingUser._id},process.env.SECRET_KEY)
        res.status(201).json({user:existingUser,token})
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong')
    }
        
}

module.exports={signin,signup}