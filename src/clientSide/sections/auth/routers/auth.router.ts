import { Router } from 'express'
import { body } from 'express-validator'
import authController from '../controllers/auth.controller'

const router = Router()

router.post(
    '/register',
    [body('password').isLength({ min: 6, max: 32 })],
    authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)

export default router