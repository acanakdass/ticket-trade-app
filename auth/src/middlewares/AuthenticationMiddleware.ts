// import { NextFunction, Request, Response } from "express";
// import { validationResult } from "express-validator";
// import { SecurityHelper } from "../helpers/SecurityHelper";

// export const AuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     if (!req.session?.jwt)
//         return next();

//     try {
//         const payload = SecurityHelper.verifyJwt(req.session.jwt)
//         req={...req,currentuser=payload};
//     } catch (error) {

//     }
//     next();
// }