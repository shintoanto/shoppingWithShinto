import caughtAsynchErrors from '../utils/caughtAsyncError.js'
import User from '../models/user.js';

export const registerUser = caughtAsynchErrors(async (req, res, next) => {
    const { email, name, password } = req.body;

    const user = await User.create({ email, name, password });
    const token = await user.getJwtToken();

    res.status(200).json({ 
        token,
        user
     });
});