import mongoose from "mongoose";

export const connectDatabse = () => {

    let DB_URL = "";

    if(process.env.NODE_ENV = "DEVELOPMENT") DB_URL = process.env.DB_LOCAL_URI;

    if(process.env.NODE_ENV = "PRODUCTION") DB_URL = process.env.DB_LOCAL_URI;

    mongoose.connect(DB_URL).then((cons)=>{
        console.log('MOngoddb database connected'+DB_URL);
    });
    
} 