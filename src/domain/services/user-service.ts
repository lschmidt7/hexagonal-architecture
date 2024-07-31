import { User, UserInterface } from "../entities/user";

interface UserServiceInterface {
    getUser(id: number): UserInterface
    createUser(name: string, idade: number): boolean
    enableUser(user: UserInterface): boolean
    disableUser(user: UserInterface): boolean
}

interface UserPersistenceInterface {
    get(id: number): UserInterface
    save(user: UserInterface): boolean
}

export class UserService implements UserServiceInterface {

    constructor(
        private persistence: UserPersistenceInterface
    ) {}

    getUser(id: number): UserInterface {
        let user = this.persistence.get(id)
        return user
    }

    createUser(name: string, idade: number): boolean {
        let user = new User(name, idade)
        let success = this.persistence.save(user)
        return success
    }

    enableUser(user: UserInterface): boolean {
        return true
    }

    disableUser(user: UserInterface): boolean {
        return true
    }
}