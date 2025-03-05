import { IUserRepo, signupType } from "../interfaces/IRepo";
import { IUserService } from "../interfaces/IService";
import { UserDoc } from "../models/userModel";
import ErrorResponse from "../utils/ErrorResponse";
import { generateToken } from "../utils/generateToken";


export class UserService implements IUserService {
    private repo: IUserRepo
    constructor(repo: IUserRepo) {
        this.repo = repo
    }
    async loginService(data: { email: string; password: string; }): Promise<UserDoc | null> {
        const existingUser = await this.repo.findByEmail(data.email);
        if (!existingUser) {
            throw ErrorResponse.badRequest('User not found')
        }
        const matchPassword = existingUser?.matchPassword(data.password)
        if (!matchPassword) {
            throw ErrorResponse.badRequest('Password incorrect')
        }

        return existingUser;
    }
    async signupService(data: signupType): Promise<UserDoc | null> {
        const existingUser = await this.repo.findByEmail(data.email);
        if (existingUser) {
            throw ErrorResponse.badRequest('User already exist')
        }

        return await this.repo.signup(data);
    }
}