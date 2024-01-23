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
    },
    price:{
        require:[true,"Enter your product price"],
        type:Number,
        maxLength:[8]
    },
    category:{
        require:[true],
        type:String,

    },  
    ratings:{
        require:[true],
        type:Number,
    },
    images:[{
        public_id:{
            require:[true],
            type:String,
        },
        url:{
            require:[true],
            type:String,
        }
    }],
    seller:{
        type:String,
        maxLength:[70]
    },
    stock:{
        type:Number,
        maxLength:[8]
    },
    numOfReviews:{
        type:Number,
    },
    reviews:[],
});

export default mongoose.model("Product",productSchemea);