export const authorizeRole=(...args)=>{
    
    return function(req,res,next){
       
          if(!args.includes(req.user.role)){
            res.status(403).json({
                message:"user is not allowed to access this content"
            })
            return 
          }
          next()
    }
}