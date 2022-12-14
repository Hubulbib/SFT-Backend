export class UserDto {
    id: string
    username: string

    constructor(model) {
        this.id = model._id
        this.username = model.username
    }
}