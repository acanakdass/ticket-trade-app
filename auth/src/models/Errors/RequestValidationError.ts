import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";

export class RequestValidationError extends CustomError {
    errors: ValidationError[]
    constructor(errors: ValidationError[]) {
        super("Validaton Errors");
        this.errors = errors;
        // Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
    statusCode = 400;
    serializeErrors() {
        const formattedErrors = this.errors.map(error => {
            return { message: error.msg, field: error.param };
        });
        return formattedErrors
    }
}