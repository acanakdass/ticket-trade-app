import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware';
require('dotenv').config();
import express from "express";
import 'express-async-errors';
import bodyParser from "body-parser";
import { router } from "./routes/routes";
import mongoose from 'mongoose';
import { User } from './models/entities/User';
import cookieSession from 'cookie-session';

const app = express()
app.set('trust proxy', true)
app.use(bodyParser.json())
app.use(cookieSession({
    signed: false,
    secure: true
}))
app.use(router)
app.use(ErrorHandlerMiddleware)

const connectMongo = async () => {
    if (!process.env.JWT_KEY)
        throw new Error("JWT_KEY must be defined!")
    mongoose.set('strictQuery', false)
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth').then(res => {
        // mongoose.connect('mongodb://localhost:27017/auth').then(res => {
        console.log('Connected to mongo..')
    }).catch(err => {
        console.log('An Error occured while connecting to mongo')
        console.log(err)
    })
}

app.listen(process.env.PORT, () => {
    console.log("Listening app on port " + process.env.PORT + " :)")
})

connectMongo(); 