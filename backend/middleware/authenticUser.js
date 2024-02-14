import user from "../models/user.js";
import caughtAsyncError from "../utils/caughtAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js"
import jwt from "jsonwebtoken";


export const isUserAuthentic = caughtAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Login first to access this resourse", 401));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
   
    req.user = await user.findById(decode?.id);

    next();
});

// Authorize user roles

export const authorizeuserRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.roles)) {
            return next(new ErrorHandler('Role{req.user.roles} is not allowed to acess' + req.user.roles, 403));
        }

        next();
    }
}