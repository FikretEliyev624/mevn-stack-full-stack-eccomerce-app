const express=require('express')
const userRouter=require('./routes/user')
const productRouter=require('./routes/product')
const cartRouter=require('./routes/cart')
const mongoose=require('mongoose')
const cors=require('cors')
const helmet=require('helmet')
const mailRouter=require('./routes/mail')
const auth=require('./middlewares/auth')
require('dotenv').config()
const path=require('path')
const app=express()

app.use(cors())
app.use(express.json())
app.use('/',mailRouter)
app.use(helmet({
    crossOriginResourcePolicy: false,
}))
app.use('/users',userRouter)
app.use('/products',productRouter)
app.use('/carts',auth,cartRouter)
app.use('/uploads',express.static(path.join(__dirname,'../uploads')))


app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log('Connect to Database'))
    .catch(err=>console.log(err))
})