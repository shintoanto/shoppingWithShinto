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
         return ErrorHandling("User is not in the list ", 400);

    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
         return ErrorHandling("Email or password is invalid", 401);
       
    }

    // check if password is correct
    const isPasswordMatched = await user.comparePassword(password);


    if (!isPasswordMatched) {
         return ErrorHandling("Email or password is invalid", 401);
        
    }

    const token = user.getJwtToken();
    res.status(200).json({
        token,
    });

    sendToken(user, 200, res);
});

// logout user
export const logoutUser = caughtAsynchErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        message: "Logged Out"
    });

});


// reset password
export const resetPassword = caughtAsynchErrors(async (req, res, next) => {
   
    const { email, password } = req.body;



    const user = await User.findOne({ email:req.body.email});

    if (!user) {
         return ErrorHandling("User is not found", 404);
       
    }

  

    // Get reset password
    var resetToken= user.getResetPasswordToken();

      // check if password is correct
      await user.save();

    if (!isPasswordMatched) {
         return ErrorHandling("Invalid Email or password is invalid", 401);
        
    }

    sendToken(user, 200, res);
});