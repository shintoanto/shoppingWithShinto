import date from 'date-and-time';

export default (user, statuscode, res) => {

    // Create jwt token
    const token = user.getJwtToken();

    // Creating object of current date and time  
    // by using Date()  
    // const now = new Date(07-03 - 2021);

    // Options for cokies
    const options = {
        expires: Date(Date.now() + process.env.COKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    console.log(options);

    res.status(statuscode).cookie("token", token, options).json({ token });
};