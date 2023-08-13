import Product from "../models/productModel.js"
import ErrorHandler from "../utils/errorhandler.js"
import {Asyncerror} from "../middlewares/asyncerror.js"
import cloudinary from 'cloudinary'
export const Getallproducts=Asyncerror(async(req,res)=>{
          
           let queryarr1=Object.keys(req.query)
             if(queryarr1.length!=0){
                for(let i=0;i<queryarr1.length;i++){
                  if(req.query[queryarr1[i]]==''){
                    delete req.query[queryarr1[i]]
                  }
                }
             }
           console.log(req.query,'.......')
           const currentPage=req.query?.page|| 1
           const resultPerPage=2
           const skip=(currentPage-1)*resultPerPage
           let products= await Product.find({})
           let productCount= await Product.countDocuments()
           if(Object.keys(req.query).length!=0){
         
            const queryarr= Object.keys(req.query)
          
        let copyqueryarr=queryarr.filter((val)=>{
            if(val=='keyword'|| val=='limit' || val=='page')
            return true
            return false
      })
      let copyquery={...req.query}
        copyqueryarr.forEach(element => {
              delete copyquery[element]
        });
          console.log(copyquery,'2nd')
        let querystr=JSON.stringify(copyquery)
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        querystr=JSON.parse(querystr)

        
           if(queryarr.includes('keyword')){
           
         products=await Product.find({...querystr,name:{ $regex: req.query.keyword,
          $options: "i",}}).limit(resultPerPage).skip(skip)
          productCount= await Product.find({...querystr,name:{ $regex: req.query.keyword,
            $options: "i",}}).countDocuments()
        
           }
           else{
            console.log(querystr)
            const demoproducts=await Product.find(querystr)
            console.log(demoproducts)
           
            products=await Product.find(querystr).limit(resultPerPage).skip(skip)
              if(demoproducts.length>0 && products.length==0){
                console.log('demo')
                products=demoproducts
               
              }
            productCount=await Product.find(querystr).countDocuments()
           
           }
       
      
      
        }
       
     res.status(201).json({
        message:'Products fetched successfully',
        products,
        productCount,
        resultPerPage
     })
})
export const CreateProduct=Asyncerror( async(req,res)=>{
    console.log(JSON.parse(req.body.images).length)
   const receiveimage= JSON.parse(req.body.images)
 
     let images=[]
     
   
    
      images=receiveimage
     
   
     const imagelinks=[]
    
      for(let i=0;i<images.length;i++){
        const mycloud=await cloudinary.v2.uploader.upload(images[i],{
          folder:'productimages'
        })
     
        imagelinks.push({
          public_id:mycloud.public_id,
          url:mycloud.secure_url
        })
      }
      console.log(imagelinks)
    req.body.user=req.user._id
    req.body.images=imagelinks
    const product= await Product.create(req.body)
    res.status(201).json({
        success:true,
        message:'product created successfully',
        product
    })
})

export const UpdateProduct=Asyncerror(async(req,res)=>{
  let images=[]
 
        const productid= req.params.id
       console.log(req.body.images)
       let product= await Product.findById(productid)
      
         if(!product){
          return next(new ErrorHandler("product not found", 500));
         }
         if(req.body.images!=undefined){
           
         
          const receiveimage= JSON.parse(req.body.images)
           images=receiveimage
          
          const imagelinks=[]
           for(let i=0;i<product.images.length;i++){
             await cloudinary.v2.uploader.destroy(product.images[i].public_id)
           }
         
          for(let i=0;i<images.length;i++){
            
            const mycloud=await cloudinary.v2.uploader.upload(images[i],{
              folder:'productimages'
            })
            console.log(mycloud)
            imagelinks.push({
              public_id:mycloud.public_id,
              url:mycloud.secure_url
            })
          }
            req.body.images=imagelinks
         }
     
      product= await Product.findByIdAndUpdate(productid, req.body ,{
        new:true
      })
      console.log(product)
         res.status(201).json({
            success:true,
            product
         })

        
   

})

export const deleteProduct=Asyncerror(async(req,res)=>{

    let deleteproduct= await Product.findById(req.params.id)
    console.log(deleteproduct)
         if(!deleteproduct){
          return next(new ErrorHandler("product not found", 500));
         }
         for (let i = 0; i < deleteproduct.images.length; i++) {
          await cloudinary.v2.uploader.destroy(deleteproduct.images[i].public_id);
        }
      
   await Product.findByIdAndRemove(req.params.id)
  
    res.json({
        success:true,
        message:'deleted successfully'
    })
})
export const getProductDetail= Asyncerror(async(req,res,next)=>{
      
  
        const product= await Product.findById(req.params.id)
           
              if(!product){
                return next(new ErrorHandler("product not found", 500));
              }
              res.status(201).json({
                success:true,
                product
              })
        

})


export const creatProductReview=Asyncerror(async(req,res)=>{
    const { rating, comment, productId } = req.body;
        const review={
            user:req.user._id,
            rating:Number(rating),
            comment,
            name:req.user.name
        }
         const product= await Product.findById(productId)
        
         const isreviewed=product.reviews.find((obj)=>{
             console.log(obj.user,req.user._id)
           if(obj.user.toString()==req.user._id.toString())
             return true
        
        })
     
      if(isreviewed){
         product.reviews.forEach((obj)=>{
                if(obj.user.toString()==req.user._id.toString()){
                    obj.rating=rating
                    obj.comment=comment
                }
         })
         product.numOfReviews= product.reviews.length
      }
      else{
        const reviewarr=product.reviews
          reviewarr.push(review)
           product.numOfReviews=reviewarr.length
           
      }
      const totalrating=product.ratings
      let sum=0;
      for(let i=0;i<product.reviews.length;i++){
        sum+=product.reviews[i].rating
      }
      sum=sum/product.reviews.length
      product.ratings=sum
      await product.save({validateBeforeSave:false})
      res.status(200).json({
        success: true,
      });
})
export const getProductReviews = Asyncerror(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler("product not found for this id", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });

  export const deleteReview = Asyncerror(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("product not found for this id", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });

  export const getAdminProducts = Asyncerror(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });