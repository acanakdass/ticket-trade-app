import { body } from "express-validator";

const UpdateTicketValidationMiddleware = () =>
    [
        body('id')
            .trim()
            .notEmpty()
            .isLength({ min: 1 }),
        body('title')
            .trim()
            .notEmpty()
            .withMessage("Title is required!")
            .isLength({ min: 3, max: 50 })
            .withMessage("Title must be between 3 and 50 characters"),
        body('price')
            .notEmpty()
            .isFloat({ gt: 0 })
            .withMessage("Price must be greater than 0!")
    ]
export { UpdateTicketValidationMiddleware }