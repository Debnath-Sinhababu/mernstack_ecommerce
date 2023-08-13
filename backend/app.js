import express from 'express'
import product from './routes/ProductRoutes.js';
import userroute from './routes/UserRoutes.js';
import orderroute from './routes/OrderRoutes.js'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import multipart from 'connect-multiparty';
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer';
import { RegisterUser } from './controllers/UserController.js';
import busboyBodyParser from 'busboy-body-parser';
import ErrorHandler from './utils/errorhandler.js';
 import Errorresponse from './middlewares/error.js';
import payment from './routes/PaymentRoutes.js'
const app=express()


dotenv.config({path:'backend/.env'})
app.use(cors({origin: true, credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  
  }));

  app.use(express.json({ limit: "50mb" }))

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))
app.use(busboyBodyParser({limit:'50mb'}))

app.use("/api/v1", product);
app.use("/api/v1", userroute);
app.use("/api/v1", orderroute);
app.use('/api/v1',payment)
app.use(Errorresponse)

export default app