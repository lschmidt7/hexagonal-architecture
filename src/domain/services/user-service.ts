import { User, UserInterface } from "../entities/user";

interface UserServiceInterface {
    get(id: number): UserInterface
    create(name: string, birthDate: Date): boolean
    enable(user: UserInterface): boolean
    disable(user: UserInterface): boolean
}

export interface UserPersistenceInterface {
    get(id: number): UserInterface
    save(user: UserInterface): boolean
}

export class UserService implements UserServiceInterface {

    constructor(
        private persistence: UserPersistenceInterface
    ) {}

    get(id: number): UserInterface {
        let user = this.persistence.get(id)
        return user
    }

    create(name: string, birthDate: Date): boolean {
        let user = new User(name, birthDate)
        let validUser = user.isValid()
        let success = false
        if (validUser) {
            success = this.persistence.save(user)
        }
        return success
    }

    enable(user: UserInterface): boolean {
        return true
    }

    disable(user: UserInterface): boolean {
        return true
    }
}