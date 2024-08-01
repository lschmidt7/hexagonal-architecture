import { describe, test, expect, vi } from "vitest";

import { UserService } from "./user-service";
import { User } from "../entities/user";

describe('test UserService methods', () => {
    test('test UserService get', () => {

        const mockPersistence = {
            get: vi.fn().mockReturnValue(new User('Leonardo', new Date(2001,1,5))),
            save: vi.fn()
        }

        let userService = new UserService(mockPersistence)

        const getSpy = vi.spyOn(mockPersistence, 'get')

        let user = userService.get(3)
    
        expect(getSpy).toHaveBeenCalled()
        expect(getSpy).toHaveBeenCalledWith(3)
        expect(user.getName()).toEqual('Leonardo')
    })

    test('test UserService create', () => {
        const mockPersistence = {
            get: vi.fn(),
            save: vi.fn().mockReturnValue(true)
        }

        const saveSpy = vi.spyOn(mockPersistence, 'save')

        let userService = new UserService(mockPersistence)

        let saved = userService.create('Leonardo', new Date(2001,1,5))

        expect(saveSpy).toHaveBeenCalled()
        expect(saveSpy).toHaveBeenCalledTimes(1)
        expect(saved).toEqual(true)
    })

    test('test failed UserService create', () => {
        const mockPersistence = {
            get: vi.fn(),
            save: vi.fn().mockReturnValue(true)
        }

        const saveSpy = vi.spyOn(mockPersistence, 'save')

        let userService = new UserService(mockPersistence)

        let saved = userService.create('Leonardo', new Date(2010,1,5))

        expect(saveSpy).toHaveBeenCalledTimes(0)
        expect(saved).toEqual(false)
    })
})