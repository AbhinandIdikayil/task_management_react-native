import { NextFunction, Request, Response } from "express";
import { signupValidation } from "../utils/validator/signupValidator";
import ErrorResponse from "../utils/ErrorResponse";
import { loginValidator } from "../utils/validator/loginValidator";
import { IUserService } from "../interfaces/IService";
import { generateToken } from "../utils/generateToken";


export class AuthController {
    private service: IUserService
    constructor(service: IUserService) {
        this.service = service;
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = loginValidator.validate(req.body)
            if (error) {
                const formattedErrors = error.details.map((err) => ({
                    message: err.message.replace(/["\\]/g, ''),
                    field: err.path.join('.'),
                }));

                throw ErrorResponse.badRequest(
                    formattedErrors,
                );
            }
            const data = await this.service.loginService(value);
            const token = generateToken(data?._id)
            return res.status(200).json({
                token, userData: {
                    name: data?.name,
                    email: data?.email
                }, success: true
            })
        } catch (error) {
            next(error)
        }
    }
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = signupValidation.validate(req.body);
            if (error) {
                const formattedErrors = error.details.map((err) => ({
                    message: err.message.replace(/["\\]/g, ''),
                    field: err.path.join('.'),
                }));

                throw ErrorResponse.badRequest(
                    formattedErrors,
                );
            }
            const data = await this.service.signupService(value)
            const token = generateToken(data?._id)
            return res.status(200).json({
                token, userData: {
                    name: data?.name,
                    email: data?.email
                }, success: true
            })
        } catch (error) {
            next(error)
        }
    }
}