import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware';
import express from "express";
import 'express-async-errors';
import bodyParser from "body-parser";
import { router } from "./routes/routes";
import cookieSession from 'cookie-session';

const app = express()
app.set('trust proxy', true)
app.use(bodyParser.json())
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' //means if true; set cookie only if request is with https connection. not http
}))
app.use(router)
app.use(ErrorHandlerMiddleware)

export { app }