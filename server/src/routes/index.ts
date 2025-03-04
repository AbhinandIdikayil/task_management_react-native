import { Router } from 'express'
import { AuthController } from '../controller/AuthController'
import { UserRepo } from '../repo/UserRepo'
import { UserService } from '../service/UserService'

const router = Router()
const userRepo = new UserRepo()
const userService = new UserService(userRepo)
const authController = new AuthController(userService)

router.route('/login').post(authController.login.bind(authController))
router.route('/login').post(authController.login.bind(authController))