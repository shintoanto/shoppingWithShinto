import ErrorHandling from "../utils/ErrorHandler";

export default (err, req, res, next) => {
    let error = {
        statusCode : err.statusCode | 500,
        message : err.message | "Internal server error"

    };

    if(process.env.NODE_ENV === "DEVELOPMENT"){
        res.status(error.statusCode).json({
            message:error.message,
            error:err,
            stack:err?.stack,
        });
    }

    if(process.env.NODE_ENV === "PRODUCTION"){
        res.status(error.statusCode).json({
            message:error.message,
        });
    }

    if(err.name === "CastError"){
        const message = "Resource is not found. Invalid"+err.path;
        error = new ErrorHandling(message,404);
    };

    // Handling mongoose key error
    if(err.code === 11000){
        const message = `Duplicate field entered ${Object.keys(err.keyValue)}entered`;
        error = new ErrorHandling(message,404);
    };

    // Handling twt token error
    if(err.name === "JSONWebTokenError"){
        const message = "Invalid or expired token.";
        error = new ErrorHandling(message,401)
    }

    // Handling token expiring time
    if(err.name === "JSONWebTokenTime"){
        const message = "json web token time expired"
        error = new ErrorHandling(message,401);
    }

}