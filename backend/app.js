import express  from "express";
const app = express();
import dotenv  from "dotenv";
import cookieparser from "cookie-parser";

dotenv.config({path: "backend/config/config.env" });

import authRoutes  from "./routes/authRoutes.js";
import  productRout   from "./routes/productsRoutes.js";
import { connectDatabse } from "./config/dbConnect.js";
import ip  from "ip";
import ErrorHandling from "./utils/ErrorHandler.js";
import cookieParser from "cookie-parser";

// connect database
connectDatabse();
//app.use('/api/v1',productRout);
app.use(cookieparser());

// Uncaught exception
process.on('uncaughtException',(err)=>{
   
    console.log(err.stack);
    console.log('Process on exit due to uncaught exception');
    process.exit;
});

app.use(express.json());
console.dir ( ip.address());
console.log(ip.address());

app.use('/api/v1',authRoutes);

app.use('/api/v1',productRout);

app.use(ErrorHandling);

const server = app.listen(process.env.PORT | 5020,()=>{
    console.log('Port is connected: '+ process.env.PORT + process.env.NODE_ENV );
});

// Handle unhadled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(err+"message of error");
    console.log("Shuting down server due to unhandled promise rejection");
    server.close(()=>{
        process.exit(1);
    });
});
