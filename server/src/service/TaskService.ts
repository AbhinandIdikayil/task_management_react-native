import { ITaskRepo } from "../interfaces/IRepo";
import { ITaskService } from "../interfaces/IService";
import { TaskDoc } from "../models/TaskModel";
import { TaskTypeRepo, updateTaskByIdType } from "../types/task";
import ErrorResponse from "../utils/ErrorResponse";


export class TaskService implements ITaskService {
    private repo: ITaskRepo
    constructor(repo: ITaskRepo) {
        this.repo = repo
    }
    async createTask(data: TaskTypeRepo): Promise<TaskDoc> {
        return await this.repo.create(data)
    }
    async deleteTask(id: string): Promise<TaskDoc | null> {
        const task = await this.repo.deleteById(id);
        if (!task) {
            throw ErrorResponse.badRequest('Couldnot find task')
        }
        return task
    }
    async findOneTask(id: string): Promise<TaskDoc | null> {
        const data = await this.repo.findOneByid(id)
        if (!id) throw ErrorResponse.badRequest('Couldnot find task')
        return data
    }
    async getAllTask(userId: string): Promise<TaskDoc[] | []> {
        return await this.repo.findByUserid(userId)
    }
    async updateTask(id: string, data: updateTaskByIdType): Promise<TaskDoc | null> {
        return await this.repo.updateById(id, data)
    }
}