import { NextFunction, Request, Response } from "express";
import { signupValidation } from "../utils/validator/signupValidator";
import ErrorResponse from "../utils/ErrorResponse";
import { loginValidator } from "../utils/validator/loginValidator";
import { IUserService } from "../interfaces/IService";


export class AuthController {
    private service: IUserService
    constructor(service: IUserService) {
        this.service = service;
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = loginValidator.validate(req.body)
            if (error) {
                console.log(error?.message)
                throw ErrorResponse.badRequest(error?.message || 'Invalid request data');
            }
            const data = await this.service.loginService(value);
            return res.status(200).json({ token: data, success: true })
        } catch (error) {
            next(error)
        }
    }
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = signupValidation.validate(req.body);
            if (error) {
                console.log(error?.message)
                throw ErrorResponse.badRequest(error?.message || 'Invalid request data');
            }
            const token = await this.service.signupService(value)
            return res.status(200).json({ token, success: true })
        } catch (error) {
            next(error)
        }
    }
}