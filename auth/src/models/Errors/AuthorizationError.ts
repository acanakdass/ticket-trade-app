import { CustomError } from "./CustomError";

export class AuthorizationError extends CustomError {
    message: string = "Authorization Failed"
    constructor() {
        super("Authorization Failed");
    }
    statusCode: number = 401;
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.message }]
    }
}