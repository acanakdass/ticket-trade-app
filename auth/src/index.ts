require('dotenv').config();
import mongoose from 'mongoose';
import { app } from './app';

const connectMongo = async () => {
    if (!process.env.JWT_KEY)
        throw new Error("JWT_KEY must be defined!")
    mongoose.set('strictQuery', false)
    console.log("Trying to establish connection with mongo")
    await mongoose.connect('mongodb://localhost:27017/auth').then(res => {
    // await mongoose.connect('mongodb://auth-mongo-srv:27017/auth').then(res => {
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