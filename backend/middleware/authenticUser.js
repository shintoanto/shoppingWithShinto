import caughtAsyncError from "../utils/caughtAsyncError.js";
import jwt from "jsonwebtoken";


export const isUserAuthentic = caughtAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    console.log(token);
   

    if(!token){
        return next(new ErrorHandler("Login first to access this resourse",401));
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET_TOKEN);
    req.user = await User.findById(decode.id);

    next();
});