import { body, param } from 'express-validator'

export const validatorMiddleware = (type: string) => {
  switch (type) {
    case 'create-user':
      return [
        body('username').isLength({ min: 8, max: 30 }),
        body('password').matches('/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g'),
        body('fullName').not().isEmpty(),
        body('phone').isMobilePhone('ru-RU'),
        body('email').isEmail().normalizeEmail(),
        body('department').optional().not().isEmpty(),
        body('accesses').isArray({ min: 1 }).not(),
      ]
    case 'edit-user':
      return [
        param('id').not().isEmpty(),
        body('username').optional().isLength({ min: 8, max: 30 }),
        body('fullName').optional().not().isEmpty(),
        body('phone').optional().isMobilePhone('ru-RU'),
        body('email').optional().isEmail().normalizeEmail(),
        body('department').optional().not().isEmpty(),
        body('accesses').optional().isArray({ min: 1 }).not(),
      ]
    default:
      return []
  }
}
