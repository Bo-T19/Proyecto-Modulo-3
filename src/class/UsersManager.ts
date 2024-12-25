
import { IUser, User } from "./User"


//Class

export class UsersManager {

    list: User[] = []

    onUserCreated = (user: User) => { }

    onUserDeleted = (id) => { }

    userNames: string[] = []

    colorArray: string[] = ["#fcf43c", "#6f75d9", "#5cc47c", "#b2e2ef", "#eee5b5", "#ffa43c"]

    //Create new user
    newProject(data: IUser, id?: string) {


        const nameInUse = this.userNames.includes(data.name)
        if (nameInUse) {
            throw new Error(`An user with name "${data.name}" already exists`)
        }

        if (data.name.length < 5) {
            throw new Error(`The name must have at least 5 characters`)
        }

        const user = new User(data, id)
        user.color = this.colorArray[Math.floor(Math.random() * 6)]
        this.list.push(user)
        this.userNames.push(user.name)
        this.onUserCreated(user)


    }


    //Get user by name
    getUserByName(name: string) {
        const user = this.list.find((user) => {
            return user.name === name
        })
        return user
    }


    //Get user by ID
    getUser(id: string) {
        const user = this.list.find((user) => {
            return user.id === id
        })
        return user
    }
}