import { signupType } from "./IRepo"


type loginType = {
    email: string,
    password: string
}
export interface IUserService {
    loginService(data: loginType): Promise<string | null>
    signupService(data: signupType): Promise<string | null>
}