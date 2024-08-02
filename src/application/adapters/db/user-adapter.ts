import { User, UserInterface } from "../../../domain/entities/user";
import { UserPersistenceInterface } from "../../../domain/services/user-service";

import { pool } from '../../database/index'

export class UserDbAdapter implements UserPersistenceInterface {

    constructor() {
        
    }

    async get(id: number): Promise<UserInterface | null> {
        const res = await pool.query('SELECT * FROM users WHERE user_id = $1', [id])
        if (res.rowCount == 1) {
            let userDb = res.rows[0]
            let user = new User(userDb.user_name, userDb.user_birth_date, userDb.user_status, userDb.user_id)
            return user
        }
        return null
    }

    async save(user: UserInterface): Promise<boolean> {
        let res = await pool.query('SELECT user_id FROM users WHERE user_id = $1', [user.getID()])
        if (res.rowCount && res.rowCount > 0) {
            let resUpdate = await this.update(user)
            return resUpdate != null
        }
        else {
            let resCreate = await this.create(user)
            return resCreate != null
        }
    }

    private async create(user: UserInterface): Promise<UserInterface | null> {
        let res = await pool.query('INSERT INTO users (user_name, user_birth_date, user_status) VALUES($1, $2, $3)', [user.getName(), user.getBirthDate(), user.getStatus()])
        if (res.rowCount && res.rowCount > 0) {
            return user
        }
        return null
    }

    private async update(user: UserInterface) : Promise<UserInterface | null> {
        let res = await pool.query('UPDATE users SET user_name = $2, user_birth_date = $3, user_status = $4 WHERE user_id = $1', [user.getID(), user.getName(), user.getBirthDate(), user.getStatus()])
        if (res.rowCount && res.rowCount > 0) {
            return user
        }
        return null
    }

}