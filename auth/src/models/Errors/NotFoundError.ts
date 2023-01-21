import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
    constructor() {
        super("Not Found Error");
        // this.errors = errors;
        // Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
    statusCode: number = 404;
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message:"Not Found!"}]
    }
}