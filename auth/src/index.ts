import { ErrorHandlerMiddleware } from './middlewares/errors/ErrorHandlerMiddleware';
require('dotenv').config()
import express from "express";
import bodyParser from "body-parser";
import { router } from "./routes";

const app = express()
app.use(bodyParser.json())

app.use(router)
app.use(ErrorHandlerMiddleware)
app.listen(process.env.PORT, () => {
    console.log("Listening app on port " + process.env.PORT + " :)")
})