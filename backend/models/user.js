import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Enter your name"],
        minLength: [20, "Exceeded the length"]

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
    resetPasswordToken:String,
    resetPasswordTokenTime:Date,

},
    { timestamps: true });

export default mongoose.model("User", userModel);