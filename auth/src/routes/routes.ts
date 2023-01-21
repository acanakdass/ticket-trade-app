import { BadRequestError } from '../models/Errors/BadRequestError';
import { NotFoundError } from '../models/Errors/NotFoundError';
import { RequestValidationError } from '../models/Errors/RequestValidationError';
import express, { Request, Response } from 'express'
import { validationResult } from 'express-validator/src/validation-result';
import { SignInValidationMiddleware } from '../middlewares/validations/SignInValidationMiddleware';
import { SignUpValidationMiddleware } from '../middlewares/validations/SignUpValidationMiddleware';
import { User } from '../models/entities/User';
import jwt from 'jsonwebtoken'
const router = express.Router();


router.get('/api/users', async (req, res) => {
    var users = await User.find({})
    res.send(users)
})

router.post('/api/users/signin', SignInValidationMiddleware(), (req: Request, res: Response) => {
    const valErrs = validationResult(req);
    if (!valErrs.isEmpty()) {
        // res.status(400).send(valErrs.array());
        throw new Error("Validation error occured!")
    }
    const { email, password } = req.body;
    console.log('signin success.. here it is a token')
    res.send('email: ' + email)

})
router.post('/api/users/signout', (req: Request, res: Response) => {
    res.send("signed out")
})
router.post('/api/users/signup', SignUpValidationMiddleware(), async (req: Request, res: Response) => {
    const valErrs = validationResult(req);
    if (!valErrs.isEmpty()) {
        throw new RequestValidationError(valErrs.array())
    }
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email })

    if (existingUser)
        throw new BadRequestError("User with email already exists!");
    const user = new User({ email, password, username })
    await user.save().then(res => {
        const userJwt = jwt.sign({ id: user.id, email: user.email }, "supersecretkey");
        req.session = {
            jwt: userJwt
        }
    }).catch((err: Error) => {
        throw new BadRequestError(err.message)
    });
    return res.status(201).send(user)
})

router.get("*", () => {
    throw new NotFoundError()
})
// router.all("*",async (req,res,next) => {
//     next(new NotFoundError())
// })


export { router as router };