import { NextFunction, Request, Response } from 'express'
import UserService from '../services/user.service.js'

class UserController {
  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await UserService.getAllUsers()

      res.json({ users: response })
    } catch (err) {
      next(err)
    }
  }

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const response = await UserService.getUserById(id)

      res.json({ user: response })
    } catch (err) {
      next(err)
    }
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body

      const response = await UserService.createUser(data)

      res.status(201).json({ user: response })
    } catch (err) {
      next(err)
    }
  }

  editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const data = req.body

      const response = await UserService.editUser(id, data)

      res.json({ user: response })
    } catch (err) {
      next(err)
    }
  }
}

export default new UserController()
