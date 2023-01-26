import { RequireAuthMiddleware } from './../middlewares/RequireAuthMiddleware';
import { AuthenticationMiddleware } from './../middlewares/AuthenticationMiddleware';
import { SecurityHelper } from '../helpers/SecurityHelper';
import { BadRequestError } from '../models/Errors/BadRequestError';
import { NotFoundError } from '../models/Errors/NotFoundError';
import { RequestValidationError } from '../models/Errors/RequestValidationError';
import express, { Request, Response } from 'express'
import { validationResult } from 'express-validator/src/validation-result';
import { SignInValidationMiddleware } from '../validations/SignInValidationMiddleware';
import { SignUpValidationMiddleware } from '../validations/SignUpValidationMiddleware';
import { User } from '../models/entities/User';
import jwt from 'jsonwebtoken'
import { RequestValidatorMiddleware } from '../middlewares/RequestValidatorMiddleware';
const router = express.Router();


//current-user route
router.get('/api/users/current-user', AuthenticationMiddleware,RequireAuthMiddleware, async (req, res) => {
    return res.send(req.currentUser || null);
})

//sign in route
router.post('/api/users/signin', SignInValidationMiddleware(), RequestValidatorMiddleware, async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (!existingUser) throw new BadRequestError("Invalid Credentials")

    const isPwMatched = await SecurityHelper.verifyPassword(existingUser.password, password);
    if (!isPwMatched) throw new BadRequestError("Invalid Credentials")
    req.session = { jwt: SecurityHelper.createJwt(existingUser.id, existingUser.email, existingUser.username) }
    return res.status(200).send(existingUser)
})

//sign up route
router.post('/api/users/signup', SignUpValidationMiddleware(), RequestValidatorMiddleware, async (req: Request, res: Response) => {

    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email })
    if (existingUser)
        throw new BadRequestError("User with email already exists!");
    const user = new User({ email, password, username })
    await user.save().then(res => {
        req.session = { jwt: SecurityHelper.createJwt(user.id, user.email, user.username) }
    }).catch((err: Error) => {
        throw new BadRequestError(err.message)
    });
    return res.status(201).send(user)
})

//sign out route
router.post('/api/users/signout', (req: Request, res: Response) => {
    req.session = null;
    res.send("Signed Out")
})


//any other route
router.all("*", () => {
    throw new NotFoundError("Route Not Found!")
})


export { router as router };