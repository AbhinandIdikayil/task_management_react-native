import { UserDoc } from "../models/userModel"
import { signupType } from "./IRepo"


type loginType = {
    email: string,
    password: string
}
export interface IUserService {
    loginService(data: loginType): Promise<UserDoc | null>
    signupService(data: signupType): Promise<UserDoc | null>
}