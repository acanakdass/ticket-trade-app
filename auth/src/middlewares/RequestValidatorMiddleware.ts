import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../models/Errors/RequestValidationError";

export const RequestValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const valErrs = validationResult(req);
    if (!valErrs.isEmpty()) {
        throw new RequestValidationError(valErrs.array())
    }
    next();
}