import app from "./app.js";
import dotenv from 'dotenv'
import { connectDB } from "./database/database.js";
import cloudinary from 'cloudinary'
import cors from 'cors'
dotenv.config({path:'backend/.env'})
   connectDB()
   cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
   })
   app.use(cors({origin: true, credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  
  }));
   process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  
app.listen(process.env.PORT,()=>{
    console.log('port is working on')
})
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });