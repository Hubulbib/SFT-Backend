import { model, Schema } from 'mongoose'
import { IUser } from '../interfaces/user.interface.js'

const schema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String },
  accesses: { type: [String], required: true, default: ['1'] },
  role: { type: String, required: true, default: 'user' },
})

export default model('User', schema)
