import { NextFunction, Request, Response } from "express";
import { ITaskService } from "../interfaces/IService";
import ErrorResponse from "../utils/ErrorResponse";

class TaskController {
    private service: ITaskService
    constructor(service: ITaskService) {
        this.service = service
    }

    async getAllTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            if (!id) throw ErrorResponse.badRequest('params should contain id');
            const data = await this.service.getAllTask(id)
            return res.status(200).json({ message: 'success', data })
        } catch (error) {
            next(error)
        }
    }

    async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, id } = req.body
            const data = await this.service.createTask({ title, description, userId: id })
            return res.status(200).json({ message: 'task created succesfully', data })
        } catch (error) {
            next(error)
        }
    }
    async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            if (!id) throw ErrorResponse.badRequest('params should contain id');
            const { title, description } = req.body
            const data = await this.service.updateTask(id, { title, description })
        } catch (error) {
            next(error)
        }
    }
    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw ErrorResponse.badRequest('params should contain id');
            const data = await this.service.deleteTask(id);
            return res.status(200).json({ message: 'task deleted successfully', id: data?._id });
        } catch (error) {
            next(error)
        }
    }
}