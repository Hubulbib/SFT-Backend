export interface IUserCreate {
  username: string
  password: string
  fullName: string
  phone: string
  email: string
  department?: string
  accesses: string[]
}
