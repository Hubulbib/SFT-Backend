import { Schema, model } from 'mongoose'
import { IToken } from '../interfaces/token.interface'

const schema = new Schema<IToken>({
    userId: { type: String, required: true },
    refreshToken: { type: String, required: true },
    ua: { type: String, required: true },
    ip: { type: String, required: true },
    expiresIn: { type: Number, required: true },
    createdAt: { type: Number, default: Date.now() }
})

export default model('Token', schema)