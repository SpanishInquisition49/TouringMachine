export class InvalidInputState extends Error {
    constructor() {
        super('Wrong argument number for State')
    }
}
export class AmbiguousState extends Error {
    constructor() {
        super('Too many with the same special character')
    }
}

export class SyntaxError extends Error {
    constructor(message: string){ 
        super(message);
    }
}

export class FileNotFound extends Error {
    constructor() {
        super('The file was not found')
    }
}