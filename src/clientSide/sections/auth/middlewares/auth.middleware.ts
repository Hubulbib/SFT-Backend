import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../exceptions/api.error'
import tokenService from '../services/token.service'

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.headers.authorization) return next(ApiError.BadRequest('Токен отсутствует'))

        const accessToken = req.headers?.authorization.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req['user'] = {...userData, details: {
                ua: req.get('User-Agent'),
                ip: req.ip,
            }
        }
        next()
    } catch (err) {
        return next(ApiError.UnauthorizedError())
    }
}