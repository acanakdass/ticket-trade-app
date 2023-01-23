import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
const scryptAsync = promisify(scrypt)

interface IUserPayload {
    id: string;
    email: string;
    username: string;
}

export class SecurityHelper {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buffer.toString('hex')}.${salt}`;
    }
    static async verifyPassword(storedPassword: string, inputPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buffer = (await scryptAsync(inputPassword, salt, 64)) as Buffer;
        return buffer.toString('hex') === hashedPassword;
    }
    static createJwt(id: string, email: string, username: string): string {
        const token = jwt.sign({ id, email, username }, process.env.JWT_KEY!);
        return token;
    }
    static verifyJwt(jwtKey: string): IUserPayload {
        const payload = jwt.verify(jwtKey, process.env.JWT_KEY!) as IUserPayload;
        return payload;
    }
}
export { IUserPayload }