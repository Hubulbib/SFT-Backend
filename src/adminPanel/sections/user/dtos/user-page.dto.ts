export class UserPageDto {
  _id: string
  username: string
  fullName: string
  phone: string
  email: string
  accesses: string[]

  constructor(user) {
    this._id = user._id
    this.username = user.username
    this.fullName = user.fullName
    this.phone = user.phone
    this.email = user.email
    this.accesses = user.accesses
  }
}
