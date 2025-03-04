import { IUserRepo } from "../interfaces/IRepo";
import { UserDoc, UserModel } from "../models/userModel";


export class UserRepo implements IUserRepo {
    async findByEmail(email: string): Promise<UserDoc | null> {
        return UserModel.findOne({ email })
    }
    async signup(data: { name: string; email: string; password: string; }): Promise<UserDoc> {
        return UserModel.create(data)
    }
}