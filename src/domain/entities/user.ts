
export interface UserInterface {
    getID(): number | undefined
    getName(): string
    getIdade(): number
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
        private idade: number,
    ){
        this.status = false
    }

    getName(): string {
        return this.name
    }

    getID(): number | undefined {
        return this.id
    }

    getIdade(): number {
        return this.idade
    }

    getStatus(): boolean {
        return this.status
    }

    enable(): boolean {
        if (this.idade >= 18) {
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
            this.status = false
        }
        return this.status
    }
}