import mongoose from "mongoose";

const productSchemea = new mongoose.Schema({
    name:{
        require:[true,"Please enter product name"],
        type:String,
        maxLength:[200,"Max length improved"]
    },
    number:{
        require:[true,"Enter your number"],
        type:Number,
        maxLength:[250,"Entere your description"]
    }
});

export default mongoose.model("Product",productSchemea);