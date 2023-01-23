import { AuthorizationError } from './../models/Errors/AuthorizationError';
import { NextFunction, Request, Response } from 'express';
export const RequireAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser)
        throw new AuthorizationError();
    next()
}
