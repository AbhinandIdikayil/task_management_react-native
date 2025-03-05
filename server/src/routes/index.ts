import { Router } from 'express'
import { AuthController } from '../controller/AuthController'
import { UserRepo } from '../repo/UserRepo'
import { UserService } from '../service/UserService'
import { TaskRepo } from '../repo/TaskRepo'
import { TaskService } from '../service/TaskService'
import { TaskController } from '../controller/TaskController'
import { auth } from '../middleware/authMiddleware'

export const router = Router()

const userRepo = new UserRepo()
const userService = new UserService(userRepo)
const authController = new AuthController(userService)


const taskRepo = new TaskRepo()
const taskService = new TaskService(taskRepo);
const taskController = new TaskController(taskService);


router.route('/auth/login').post(authController.login.bind(authController))
router.route('/auth/register').post(authController.signup.bind(authController))


router.route('/tasks')
    .get(auth, taskController.getAllTask.bind(taskController))
    .post(auth, taskController.createTask.bind(taskController))

router.route('/tasks/:id')
    .get(auth, taskController.getTask.bind(taskController))
    .put(auth, taskController.updateTask.bind(taskController))
    .delete(auth, taskController.deleteTask.bind(taskController))
