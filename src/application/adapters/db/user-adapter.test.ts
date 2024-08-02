import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { UserDbAdapter } from "./user-adapter";
import { User } from "../../../domain/entities/user";

import { pool } from '../../database/index'

async function setUp(){
    await createTable()
    await insertUser()
}

async function createTable() {
    await pool.query(`
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            user_name VARCHAR(100),
            user_birth_date DATE,
            user_status BOOLEAN
        );
    `)
}

async function insertUser() {
    await pool.query(`
        INSERT INTO users (user_name, user_birth_date, user_status) VALUES ('Leonardo', '1994-05-23', FALSE);
    `)
}

async function setDown() {
    await pool.query(`
        DROP TABLE users;
    `)
}


describe('test user-adapter', async () => {

    beforeAll(async () => {
        await setUp()
    })

    afterAll(async () => {
        await setDown();
    })

    test('test user-adapter get', async () => {
        let userDbAdapter = new UserDbAdapter()
        let userDb = await userDbAdapter.get(1)
        expect(userDb?.getName()).toEqual('Leonardo')
    })

    test('test user-adapter save', async () => {
        let userDbAdapter = new UserDbAdapter()
        
        let user = new User('João', new Date(2002, 3, 15), false)

        let res = await userDbAdapter.save(user)

        expect(res).toEqual(true)
    })

})