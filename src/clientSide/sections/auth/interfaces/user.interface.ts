export interface IUser {
  username: string
  password: string
  fullName: string
  phone: string
  email: string
  department?: string
  accesses: string[]
  role: string
}
