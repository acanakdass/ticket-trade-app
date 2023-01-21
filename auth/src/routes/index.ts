import { RequestValidationError } from './../models/Errors/RequestValidationError';
import express, { Request, Response } from 'express'
import { validationResult } from 'express-validator/src/validation-result';
import { SignInValidationMiddleware } from '../middlewares/validations/SignInValidationMiddleware';
import { SignUpValidationMiddleware } from '../middlewares/validations/SignUpValidationMiddleware';

const router = express.Router();


router.get('/api/users/getcurrentuser', (req, res) => {
    res.send('Hello :)')
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
router.post('/api/users/signup', SignUpValidationMiddleware(), (req: Request, res: Response) => {
    const valErrs = validationResult(req);
    if (!valErrs.isEmpty()) {
        throw new RequestValidationError(valErrs.array())
    }
    const { email, password } = req.body;
    console.log('creating a user..')
    return res.send('email: ' + email)
})


export { router as router };