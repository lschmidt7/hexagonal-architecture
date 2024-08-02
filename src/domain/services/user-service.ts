import { User, UserInterface } from "../entities/user";

interface UserServiceInterface {
    get(id: number): Promise<UserInterface | null>
    create(name: string, birthDate: Date): Promise<boolean>
    enable(user: UserInterface): boolean
    disable(user: UserInterface): boolean
}

export interface UserPersistenceInterface {
    get(id: number): Promise<UserInterface | null>
    save(user: UserInterface): Promise<boolean>
}

export class UserService implements UserServiceInterface {

    constructor(
        private persistence: UserPersistenceInterface
    ) {}

    async get(id: number): Promise<UserInterface | null> {
        let user = await this.persistence.get(id)
        return user
    }

    async create(name: string, birthDate: Date): Promise<boolean> {
        let user = new User(name, birthDate)
        let validUser = user.isValid()
        let success = false
        if (validUser) {
            success = await this.persistence.save(user)
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