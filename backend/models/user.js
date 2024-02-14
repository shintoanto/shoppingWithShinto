import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userModel = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Enter your name"],
        minLength: [3, "Exceeded the length"]

    },
    email: {
        type: String,
        require: [true, "Please enter your email id"],
        unique: true,
        minLength: [20, "Exceeded the length"]
    },
    password: {
        type: String,
        require: [true, "Please type your password"],
        minLength: [true, "type mix characters "],
        select: false

    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordTokenTime: Date,

},
    { timestamps: true });

userModel.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
        console.log('password not changed');
    }
    this.password = await bcrypt.hash(this.password, 10);
    console.log('password decrypted');
});

// Return jwt token
userModel.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: process.env.JWT_EXPIRE_TIME });
};

// Compare password
userModel.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// reset password token
userModel.methods.getResetPasswordToken = function () {
    // Generate token 
    const resetToken = crypto.randomBytes('20').toString("hex");

    // Hash and set to reset pass word token 
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

export default mongoose.model("User", userModel);