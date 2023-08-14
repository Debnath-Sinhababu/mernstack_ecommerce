import User from "../models/userModel.js";
import {Asyncerror} from "../middlewares/asyncerror.js"
import sendToken from "../utils/jwtToken.js";
import  {isAuthenticatedUser}  from "../middlewares/auth.js";
import sendEmail from "../utils/sendEmail.js";
import ErrorHandler from "../utils/errorhandler.js";
import crypto from 'crypto'
import cloudinary from 'cloudinary'
import multipart from "connect-multiparty";
import multer from "multer";
import {v4} from 'uuid';
export const RegisterUser=Asyncerror(async(req,res)=>{
          console.log(req.body)
    const {name,email,password}=req.body
       if(!req.body.avatar){
        const unique_id = v4();
  const small_id = unique_id.slice(0,8)
        console.log(1)
        console.log(name,email,password)
        const register=await User.create({
          name,
          email,
          password,
          avatar:{
            public_id:`${small_id}`,
            url:'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'
          }
         })
         console.log(register)
        
         sendToken(register,201,res)
       }
       else{
 const mycloud= await cloudinary.v2.uploader.upload(req.body.avatar,{
       folder:'avatars',
       width:150,
       crop:'scale'
      })
  
    const register=await User.create({
     name,
     email,
     password,
     avatar: {
         public_id: mycloud.public_id,
         url: mycloud.secure_url,
       },
    })
 
    sendToken(register,201,res)
  }
   
      
})
export const LoginUser= Asyncerror(async(req,res,next)=>{
    const {email,password}=req.body
   
     if(!email || !password){
      return  res.json({
            success:false,
             message:'pls enter email and password'
        })
     }
     const user= await User.findOne({email}).select('+password')
    
     if(!user){
     
      return next(new ErrorHandler("Invalid email or password", 401));
      
     }
     const compare= await user.comparePassword(password)
        console.log(compare)
     if(!compare){
      return next(new ErrorHandler("Invalid email or password", 401));
     }
     sendToken(user,201,res)
     

})
export const Logout=Asyncerror(async(req,res)=>{
 

     res.cookie('token','',{
        expires: new Date(
            Date.now()
          ),
          secure:true,
          httpOnly:false,
          sameSite: 'none',
         
     })
   
     const { token } = req.cookies;
    console.log(token)
   
      res.status(201).json({
        success:true,
        message:"Logged out successfully",
        token
     })
   
    
    
})
export const forgotPassword=Asyncerror(async(req,res)=>{
       const user= await User.findOne({email:req.body.email})
        if(!user){
          return next(new ErrorHandler("user not found", 404));
        }
        const resetToken=user.ResetPasswordToken()
       await user.save({validateBeforeSave:false})
       const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
      const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
     try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
          }); 



     } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        return next(new ErrorHander(error.message, 500));
     }

})
export const resetPassword=Asyncerror(async(req,res,next)=>{
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match with confirm password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  console.log(user)
  await user.save();
      
  res.status(500).json({
    success:true
  })
  //  sendToken(user,201,res)
})
export const getUserDetails = Asyncerror(async (req, res, next) => {  
   //get my detail
 
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  export const updatePassword=Asyncerror(async(req,res)=>{
    const {oldPassword,newPassword,confirmPassword}=req.body
      
        console.log(oldPassword,newPassword,confirmPassword)
    const user=await User.findById(req.user._id).select('+password')
  
   const compare= await user.comparePassword(oldPassword)
  

         if(!compare){
            console.log(1)
            return next(new ErrorHandler("old password does not match", 400));
         }

         if(newPassword!=confirmPassword){
          return next(new ErrorHandler("password does not match", 400));
         }
        user.password=confirmPassword
        await user.save()
        sendToken(user,201,res)

  })
  export const updateProfile=Asyncerror(async(req,res)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };
    
      if(req.body.avatar!=''){
       
         const user=await User.findById(req.user._id)
         if(user.avatar.url!='https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'){
          const imageId = user.avatar.public_id;

          await cloudinary.v2.uploader.destroy(imageId);
      }
          const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });
          newUserData.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url
          }
         
        
      }
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        
      });
      // console.log(user)    
  })
  // Get all users(admin)
export const getAllUser = Asyncerror(async (req, res, next) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });
       
  export const getSingleUser = Asyncerror(async (req, res, next) => {     //for admin
    const user = await User.findById(req.params.id);                    
  
    if (!user) {
      return next(new ErrorHandler("user does not exist", 401));
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  export const updateUserRole = Asyncerror(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });
  export const deleteUser = Asyncerror(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(new ErrorHandler("user does not exist", 401));
    }
    console.log(user)
    await user.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });