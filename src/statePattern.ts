export class StatePattern {
    private _from: number
    private _to: number
    public static readonly patternRegex = /^\[(.)-(.)\]$/gi

    get from() {return this._from }

    get to() { return this._to }

    constructor(pattern: string) {
        StatePattern.patternRegex.lastIndex = 0
        const match = StatePattern.patternRegex.exec(pattern)
        this._from = match[1].charCodeAt(0)
        this._to = match[2].charCodeAt(0)
    }

    public contains = (char: string): boolean => {
        const charCode = char.charCodeAt(0)
        return charCode >= this.from && charCode <= this.to 
    }
    
    public map = (inputChar: string, inputPattern: string | StatePattern): string => {
        return typeof inputPattern === 'string' ? inputPattern[0] : this.patternMap(inputChar, inputPattern)
    }

    private patternMap = (char: string, pattern: StatePattern): string => {
        const charCode = char.charCodeAt(0)
        const diff = Math.abs(charCode - this.from)
        let resCode
        if(pattern.from < pattern.to)
        resCode = diff + pattern.from >= pattern.to ? pattern.to : diff + pattern.from
        else
        resCode = pattern.from - diff <= pattern.to ? pattern.to : pattern.from - diff
        return String.fromCharCode(resCode)
    }

    static isValid = (pattern: string): boolean => {
        this.patternRegex.lastIndex = 0
        return this.patternRegex.test(pattern)
    }
}