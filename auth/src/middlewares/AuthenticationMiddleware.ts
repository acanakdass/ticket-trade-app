import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { IUserPayload, SecurityHelper } from "../helpers/SecurityHelper";


declare global {
    namespace Express {
        interface Request {
            currentUser?: IUserPayload
        }
    }
}

export const AuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt)
        return next();

    try {
        const payload = SecurityHelper.verifyJwt(req.session.jwt)
        req.currentUser = payload;
    } catch (error) {

    }
    next();
}