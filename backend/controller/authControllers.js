import caughtAsynchErrors from '../utils/caughtAsyncError.js'
import User from '../models/user.js';
import ErrorHandling from '../utils/ErrorHandler.js';
import sendToken from '../utils/sendToken.js';

console.log("/authControllers");
// Register user api/v1/register 
export const registerUser = caughtAsynchErrors(async (req, res, next) => {
    console.log("/authcontroller funtion");
    const { email, name, password } = req.body;

    const user = await User.create({ email, name, password });
    const token = await user.getJwtToken();

    res.status(200).json({
        token,
        user
    });
});

// login user api/v1/register 
export const loginUser = caughtAsynchErrors(async (req, res, next) => {
    console.log("hai");
    const { email, password } = req.body;

    if (!email || !password) {
       // return ErrorHandling("User is not in the list ", 400);

       return console.log("page not found");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
       // return ErrorHandling("Email or password is invalid", 401);
       return console.log("page not found user");
    }

    // check if password is correct
    const isPasswordMatched = await user.comparePassword(password);


    if (!isPasswordMatched) {
       // return ErrorHandling("Email or password is invalid", 401);
       return console.log("page not found password "+isPasswordMatched);
    }

       const token = user.getJwtToken();
        res.status(200).json({ 
            token,
         });

    sendToken(user, 200, res);
});