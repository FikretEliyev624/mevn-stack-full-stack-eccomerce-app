const productModel=require('../models/product')
const multer=require('multer')

const Storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cd)=>{
        cd(null,Date.now()+'--'+file.originalname)
    }
})
const upload=multer({
    storage:Storage,
}).single('testImage')


const getProducts=async(req,res)=>{
    const PAGE_SIZE=6
    const pageQuery=req.query.page
    const page=parseInt(pageQuery || '0')
    const total=await productModel.countDocuments({})
    const posts=await productModel.find({})
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE*page)


    const product=productModel.find().exec()

    return res.status(200).json({
        product,
        status:true,
        message:"Get Product Successfully",
        totalPages: Math.ceil(total / PAGE_SIZE),
        posts
        
    })
}
const getAllProducts=async(req,res)=>{
   
    const posts=await productModel.find({})


    const product=productModel.find().exec()

    return res.status(200).json({
        product,
        status:true,
        message:"Get All Product Successfully",
        posts
        
    })}

const createProducts=async(req,res)=>{
    await upload(req,res,(err)=>{
        if (err) {
            console.log(err);
        } else {
            const product=new productModel({
                name:req.body.name,
                category:req.body.category,
                specifications:req.body.specifications,
                price:req.body.price,
                image:req.file.filename,

            })
            product.save()
            .then(()=>{
                res.send('Product has been added Successfully')
            })
            .catch(err=>console.log(err))
        }
})
}


module.exports={getProducts,createProducts,getAllProducts}