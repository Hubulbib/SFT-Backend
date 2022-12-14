import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../exceptions/api.error'

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        req['user'] = {...req['user'], details: {
                ua: req.get('User-Agent'),
                ip: req.ip,
            }
        }
        next()
    } catch (err) {
        return next(ApiError.UnauthorizedError())
    }
}