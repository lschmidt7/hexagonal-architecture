
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest'
import { User } from "./user";

describe('tests of user creation', () => {

    beforeEach(() => {
        vi.useFakeTimers()

        const date = new Date(2023, 1, 1)
        vi.setSystemTime(date) // mock current date do método enable
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test('test creation of user with legal age', () => {
        let user = new User('Leonardo', new Date(1994, 4, 23))
    
        user.enable()
    
        expect(user.getStatus()).toBe(true)
    })
    
    test('test creation of user with ilegal age', () => {
        let user = new User('Leonardo', new Date(2010, 5, 23))
    
        user.enable()
    
        expect(user.getStatus()).toBe(false)
    })
    
    test('test user with empty name', () => {
        let user = new User('', new Date(1994, 5, 23))
    
        let valid = user.isValid()
    
        expect(valid).toBe(false)
    })
})