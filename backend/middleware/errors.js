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

}