import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req['user'].role

    if (role !== 'admin') {
      return next(new Error('У вас нет прав администратора'))
    }

    next()
  } catch (err) {
    return next(err)
  }
}
