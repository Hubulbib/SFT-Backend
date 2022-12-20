import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import userService from '../services/user.service.js'
import { ApiError } from '../exceptions/api.error.js'
import { ResponseTokenDto } from '../dtos/response-token.dto.js'

export const maxAge = 30 * 24 * 60 * 60 * 1000

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const details = { ua: req.get('User-Agent'), ip: req.ip }
      const data = req.body

      const userData = await userService.register(data, details)
      await this.resCookieRefreshToken(res, userData.refreshToken)
      return res.json(new ResponseTokenDto(userData))
    } catch (err) {
      next(err)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const details = { ua: req.get('User-Agent'), ip: req.ip }
      const { username, password } = req.body

      const userData = await userService.login(username, password, details)
      await this.resCookieRefreshToken(res, userData.refreshToken)
      return res.json(new ResponseTokenDto(userData))
    } catch (err) {
      next(err)
    }
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (err) {
      next(err)
    }
  }

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const details = { ua: req.get('User-Agent'), ip: req.ip }
      const { refreshToken } = req.cookies

      const userData = await userService.refresh(refreshToken, details)
      await this.resCookieRefreshToken(res, userData.refreshToken)
      return res.json(new ResponseTokenDto(userData))
    } catch (err) {
      next(err)
    }
  }

  private resCookieRefreshToken = async (res: Response, refreshToken: string) => {
    await res.cookie('refreshToken', refreshToken, { maxAge: maxAge, httpOnly: true, path: '/api/auth' })
  }
}

export default new AuthController()
