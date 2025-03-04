import { IUserRepo, signupType } from "../interfaces/IRepo";
import { IUserService } from "../interfaces/IService";
import ErrorResponse from "../utils/ErrorResponse";
import { generateToken } from "../utils/generateToken";


export class UserService implements IUserService {
    private repo: IUserRepo
    constructor(repo: IUserRepo) {
        this.repo = repo
    }
    async loginService(data: { email: string; password: string; }): Promise<string | null> {
        const existingUser = await this.repo.findByEmail(data.email);
        if (!existingUser) {
            throw ErrorResponse.badRequest('User not found')
        }
        const matchPassword = existingUser?.matchPassword(data.password)
        if (!matchPassword) {
            throw ErrorResponse.badRequest('Password incorrect')
        }
        const token = generateToken(existingUser?._id)
        return token
    }
    async signupService(data: signupType): Promise<string | null> {
        const existingUser = await this.repo.findByEmail(data.email);
        if (existingUser) {
            throw ErrorResponse.badRequest('User already exist')
        }

        const user = await this.repo.signup(data);

        return generateToken(user._id)
    }
}