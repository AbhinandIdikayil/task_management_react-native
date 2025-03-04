import { UserDoc } from "../models/userModel"




export  type signupType = {
    name: string,
    email: string,
    password: string
}


export interface IUserRepo {
    signup(data: signupType): Promise<UserDoc>
    findByEmail(email: string): Promise<UserDoc | null>
}