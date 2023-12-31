import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import  Jwt  from "jsonwebtoken";
import  {isAuthenticatedUser}  from "../middlewares/auth.js";
import crypto from 'crypto'
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
     
    },
    url: {
      type: String,
    
    },
  
  },
  role: {
    type: String,
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  userSchema.methods.getJWTToken =async function () {
    return Jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  userSchema.methods.comparePassword = async function (password) {
  
    return await bcrypt.compare(password, this.password);
  };

 userSchema.methods.ResetPasswordToken= function(){
       let resetToken=crypto.randomBytes(20).toString('hex')
       this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest('hex')
       this.resetPasswordExpire=Date.now()+15*60*1000
       return resetToken

 }

export default mongoose.model("User", userSchema);