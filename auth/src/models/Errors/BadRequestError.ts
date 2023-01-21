import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
    message: string
    constructor(message: string) {
        super(message);
        this.message = message
    }
    statusCode: number = 400;
    serializeErrors() {
        return [{ message: this.message }]
    }
}