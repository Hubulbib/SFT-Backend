import User from '../../../../clientSide/sections/auth/schemas/user.schema.js'
import { UserPageDto } from '../dtos/user-page.dto.js'
import { IUserCreate } from '../interfaces/user-create.interface.js'
import { IUserEdit } from '../interfaces/user-edit.interface.js'
import { hash } from 'bcrypt'

class UserService {
  getAllUsers = async () => {
    const users = await User.find({})

    return users.filter((el) => el.role !== 'admin').map((el) => new UserPageDto(el))
  }

  getUserById = async (userId: string) => {
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('Такого пользователя не существует')
    }

    return new UserPageDto(user)
  }

  createUser = async (userData: IUserCreate) => {
    const user = await User.findOne({ username: userData.username })

    if (user) {
      throw new Error('Пользователь с таким username уже существует')
    }

    const hashedPassword = await hash(userData.password, 4)

    return new UserPageDto(await User.create({ ...userData, password: hashedPassword }))
  }

  editUser = async (userId: string, userData: IUserEdit) => {
    const user = await User.findByIdAndUpdate(userId, { ...userData })

    if (!user) {
      throw new Error('Такого пользователя не существует')
    }

    return new UserPageDto(await User.findById(user._id))
  }
}

export default new UserService()
