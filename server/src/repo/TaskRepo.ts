import { ITaskRepo } from "../interfaces/IRepo";
import { TaskDoc, TaskModel } from "../models/TaskModel";
import { TaskTypeRepo, updateTaskByIdType } from "../types/task";


export class TaskRepo implements ITaskRepo {
    async create(data: TaskTypeRepo): Promise<TaskDoc> {
        return await TaskModel.create(data)
    }
    async deleteById(id: string): Promise<TaskDoc | null> {
        return await TaskModel.findByIdAndDelete({ _id: id })
    }
    async findByUserid(userId: string): Promise<TaskDoc[] | []> {
        return await TaskModel.find({ userId })
    }
    async findOneByid(id: string): Promise<TaskDoc | null> {
        return await TaskModel.findById(id)
    }
    async updateById(id: string, data: updateTaskByIdType): Promise<TaskDoc | null> {
        return await TaskModel.findOneAndUpdate(
            { _id: id },
            {
                $set: data
            },
            { new: true }
        )
    }
}