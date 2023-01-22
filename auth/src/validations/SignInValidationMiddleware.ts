import { body } from "express-validator";

const SignInValidationMiddleware = () =>
    [
        body('username')
            .trim()
            .notEmpty()
            .withMessage("Username is required!")
            .isLength({ min: 4, max: 20 })
            .withMessage("Username must be between 4 and 20 characters"),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage("Password must be between 4 and 20 characters!")
    ]
export { SignInValidationMiddleware }