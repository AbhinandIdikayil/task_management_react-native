import { TaskDoc } from "../models/TaskModel"
import { UserDoc } from "../models/userModel"
import { TaskTypeRepo, updateTaskByIdType } from "../types/task"
import { signupType } from "./IRepo"


type loginType = {
    email: string,
    password: string
}
export interface IUserService {
    loginService(data: loginType): Promise<UserDoc | null>
    signupService(data: signupType): Promise<UserDoc | null>
}

export interface ITaskService {
    createTask(data:TaskTypeRepo): Promise<TaskDoc>
    findOneTask(id: string): Promise<TaskDoc | null>
    getAllTask(userId: string): Promise<TaskDoc[] | []>
    deleteTask(id: string): Promise<TaskDoc | null>
    updateTask(id: string, data: updateTaskByIdType): Promise<TaskDoc | null>
}