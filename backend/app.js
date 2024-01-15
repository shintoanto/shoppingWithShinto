import express  from "express";
const app = express();
import dotenv  from "dotenv";

dotenv.config({path: "backend/config/config.env" });

import  productRout   from "./routes/productsRoutes.js";
import { connectDatabse } from "./config/dbConnect.js";
import ip  from "ip";

// connect database
connectDatabse();
//app.use('/api/v1',productRout);

app.use(express.json());
console.dir ( ip.address());
console.log(ip.address());

app.use('/api/v1',productRout);

app.listen(process.env.PORT | 5020,()=>{
    console.log('Port is connected: '+process.env.PORT+process.env.NODE_ENV);
});