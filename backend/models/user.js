import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

userModel.methods.getJwtToken = function () {
   return jwt.sign({ id: this._id }, process.env.JWT_TOKEN, { expiresIn: 60 });
    console.log(this._id);
    console.log('---------------');
    console.log(process.env.JWT_TOKEN);
    console.log('60');
};
export default mongoose.model("User", userModel);