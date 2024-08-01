
export interface UserInterface {
    getID(): number | undefined
    getName(): string
    getBirthDate(): Date
    getStatus(): boolean
    enable(): boolean
    disable(): boolean
    isValid(): boolean
}

export class User implements User {
    
    private id?: number
    private status: boolean

    constructor(
        private name: string,
        private birthDate: Date
    ){
        this.status = false
    }

    getName(): string {
        return this.name
    }

    getID(): number | undefined {
        return this.id
    }

    getBirthDate(): Date {
        return this.birthDate
    }

    getStatus(): boolean {
        return this.status
    }

    enable(): boolean {
        let valid = this.isValid()
        if (valid) {
            this.status = true
            return true
        }
        return false
    }

    disable(): boolean {
        this.status = false
        return true
    }

    isValid(): boolean {
        if (this.name == '') {
            return false
        }
        
        let birthYear = this.birthDate.getFullYear()
        let currentYear = new Date().getFullYear()
        if (currentYear - birthYear < 18) {
            return false
        }
        
        return true
    }
}