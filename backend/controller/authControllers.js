import caughtAsynchErrors from '../utils/caughtAsyncError.js'
import User from '../models/user.js';
import ErrorHandling from '../utils/ErrorHandler.js';


// Register user api/v1/register 
export const registerUser = caughtAsynchErrors(async (req, res, next) => {
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
    const { email, password } = req.body;


    if(!email | !password){
        return ErrorHandling("User is not in the list ",400);
    }
    
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return ErrorHandling("Email or password is invalid",401);
    }

    // check if password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return ErrorHandling("Email or password is invalid",401);
    }


   const token = user.getJwtToken();

    res.status(201).json({ 
        token,
     });
});