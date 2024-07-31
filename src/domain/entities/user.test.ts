
import { expect, test } from 'vitest'
import { User } from "./user";

test('test creation of user with legal age', () => {
    let user = new User('Leonardo', 19)

    user.enable()

    expect(user.getStatus()).toBe(true)
})

test('test creation of user with ilegal age', () => {
    let user = new User('Leonardo', 16)

    user.enable()

    expect(user.getStatus()).toBe(false)
})

test('test user with empty name', () => {
    let user = new User('', 16)

    let valid = user.isValid()

    expect(valid).toBe(false)
})