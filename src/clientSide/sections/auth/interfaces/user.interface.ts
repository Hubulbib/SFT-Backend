export interface IUser {
  username: string;
  password: string;
  name: string;
  surname: string;
  patronymic?: string;
  department: string;
  accesses: string[];
  role: string;
}
