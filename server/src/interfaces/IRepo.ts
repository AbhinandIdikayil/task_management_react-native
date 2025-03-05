import { TaskDoc } from "../models/TaskModel"
import { UserDoc } from "../models/userModel"
import { TaskTypeRepo, updateTaskByIdType } from "../types/task"




export type signupType = {
    name: string,
    email: string,
    password: string
}


export interface IUserRepo {
    signup(data: signupType): Promise<UserDoc>
    findByEmail(email: string): Promise<UserDoc | null>
}



export interface ITaskRepo {
    create(data: TaskTypeRepo): Promise<TaskDoc>
    findOneByid(id: string): Promise<TaskDoc | null>
    findByUserid(userId: string): Promise<TaskDoc[] | []>
    deleteById(id: string): Promise<TaskDoc | null>
    updateById(id: string, data: updateTaskByIdType): Promise<TaskDoc | null>

}