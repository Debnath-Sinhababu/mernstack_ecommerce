import { Asyncerror } from "./asyncerror.js";
import  Jwt  from "jsonwebtoken";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorhandler.js";

export const isAuthenticatedUser = Asyncerror(async (req, res, next) => {
    const { token } = req.cookies;
   

    if (!token) {
      res.status(401).json({
        success:false,
        message:'login to access the products'
      })
      return
    }
 
    const decodedData = Jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = await User.findById(decodedData.id);
  
    next();
  });