// import { CustomError } from "./CustomError";

// export class NotFoundError extends CustomError {
//     constructor(errors: ValidationError[]) {
//         super("Validaton Errors");
//         this.errors = errors;
//         // Object.setPrototypeOf(this, RequestValidationError.prototype)
//     }
//     statusCode: number = 404;
//     serializeErrors(): { message: string; field?: string | undefined; }[] {
//         [{}]
//     }
// }