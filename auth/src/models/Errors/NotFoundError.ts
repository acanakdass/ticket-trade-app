import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
    message: string
    constructor(message: string) {
        super(message);
        this.message = message;
    }
    statusCode: number = 404;
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.message }]
    }
}