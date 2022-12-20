import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import { validatorMiddleware } from './middlewares/validator.middleware.js'

const router = Router()

router.get('/', userController.getAllUsers)

router.get('/:id', userController.getUserById)

router.post('/', validatorMiddleware('create-user'), userController.createUser)

router.put('/:id', validatorMiddleware('edit-user'), userController.editUser)

export default router
