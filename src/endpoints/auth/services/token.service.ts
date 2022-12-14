import { sign, verify } from 'jsonwebtoken'
import Token from '../schemas/token.schema'
import {maxAge} from '../controllers/auth.controller'

const SECRET_ACCESS_JWT = process.env.SECRET_ACCESS_JWT
const SECRET_REFRESH_JWT = process.env.SECRET_REFRESH_JWT
const EXPIRES_IN_ACCESS = process.env.EXPIRES_IN_ACCESS
const EXPIRES_IN_REFRESH = process.env.EXPIRES_IN_REFRESH

class TokenService {

    generateTokens = (payload: object) => {
        const accessToken = sign(payload, SECRET_ACCESS_JWT, { expiresIn: EXPIRES_IN_ACCESS })
        const refreshToken = sign(payload, SECRET_REFRESH_JWT, { expiresIn: EXPIRES_IN_REFRESH })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken = (token: string) => {
        try {
            return verify(token, SECRET_ACCESS_JWT)
        } catch (err) {
            return null
        }
    }

    validateRefreshToken = (token: string) => {
        try {
            return verify(token, SECRET_REFRESH_JWT)
        } catch (err) {
            return null
        }
    }

    saveToken = async(userId: string, refreshToken: string, ua: string, ip: string) => {
        const EXPIRES_IN = Date.now() + maxAge

        const tokenData = await Token.find({userId}, null, {sort: {createdAt: 1}})

        if (tokenData.length == 5) {
            tokenData[4].refreshToken = refreshToken
            tokenData[4].ua = ua
            tokenData[4].ip = ip
            tokenData[4].expiresIn = EXPIRES_IN
            tokenData[4].createdAt = Date.now()

            tokenData.map(el => {
                this.removeToken(el.refreshToken)
            })

            return (await tokenData[4].save())
        }
        return (await Token.create({ userId, refreshToken, ua, ip, expiresIn: EXPIRES_IN, createdAt: Date.now()}))
    }

    removeToken = async(refreshToken: string) => {
        return (await Token.deleteOne({ refreshToken }))
    }

    findToken = async(refreshToken: string) => {
        return (await Token.findOne({ refreshToken }))
    }
}

export default new TokenService()