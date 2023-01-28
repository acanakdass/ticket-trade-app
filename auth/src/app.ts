import express from "express";
import 'express-async-errors';
import bodyParser from "body-parser";
import { router } from "./routes/routes";
import cookieSession from 'cookie-session';
// import cors from 'cors'
import cors from 'cors'
import { ErrorHandlerMiddleware } from "@acanakdas/authcommon/build/middlewares/ErrorHandlerMiddleware";
const app = express()
app.set('trust proxy', true)
app.use(cors({credentials:true,origin:"http://localhost:3001"}))
app.use(bodyParser.json())
app.use(cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test' //means if true; set cookie only if request is with https connection. not http
    secure: false //means if true; set cookie only if request is with https connection. not http
}))
app.use(router)
app.use(ErrorHandlerMiddleware) 

export { app }