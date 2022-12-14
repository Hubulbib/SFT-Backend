export class UserDto {
  id: string;
  username: string;
  role: string;

  constructor(model) {
    this.id = model._id;
    this.username = model.username;
    this.role = model.role;
  }
}
