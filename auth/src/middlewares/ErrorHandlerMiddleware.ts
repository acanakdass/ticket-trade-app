import { CustomError } from '../models/Errors/CustomError';
import { RequestValidationError } from '../models/Errors/RequestValidationError';
import { NextFunction, Request, Response } from "express";

export const ErrorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(400).send({ errors: err.serializeErrors() });
    } else {
        console.log(err.message)
        const errors = [{ message: "Something went wrong!" }]
        return res.status(400).send({ errors });
    }
}