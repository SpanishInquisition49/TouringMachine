import { FileNotFound, InvalidInputState } from "./errors";
import * as fs from 'fs';
import { StatePattern } from "./statePattern";

export enum SpecialChar{
    Empty = '_',
    AnyNotEmpty = '**',
    Space = '__',
}

export enum Movement{
    Left = '<',
    Right = '>',
    Stay = '_',
}

export class State {
    current_status: string;
    buffer_read: string;
    new_state: string;
    buffer_write: string;
    pointer_movement: Movement

    constructor(s:string) {
        let tmp = s.trim().replace(/\s/g,'').replace('(', '').replace(')', '').split(',');
        try {
            this.current_status = tmp[0];
            this.buffer_read = tmp[1];
            this.new_state = tmp[2];
            this.buffer_write = tmp[3];
            this.pointer_movement = tmp[4] as Movement;
        }
        catch {
            throw new InvalidInputState();
        }
    }

    static ReadProgramFromFile = (fileName:string): State[] => {
        if(!fs.existsSync(fileName))
            throw new FileNotFound()
        
        const buffer = fs.readFileSync(fileName, 'utf-8')
        let states = buffer.split('\n').filter((s) => s[0] !== '#');
        let res: State[] = [];
        states.map((s) => {res.push(...State.CrateStates(s))});
        return res;
    }

    private static CrateStates = (s:string): State[] => {
        let tmp = s.trim().replace(/\s/g,'').replace('(', '').replace(')', '').split(',');
        if(!StatePattern.isValid(tmp[1]))
            return [new State(s)]
        return this.CreateStatesFromPattern(tmp[0], tmp[1], tmp[2], tmp[3], tmp[4])
    }

    private static CreateStatesFromPattern = (cs:string, tr:string, ns:string, tw:string, pm:string): State[] => {
        let res = []
        const pattern = new StatePattern(tr)
        const mapped = StatePattern.isValid(tw) ? new StatePattern(tw) : tw
        for(let i = pattern.from; i<= pattern.to; i++){
            let tri = String.fromCharCode(i)
            let twi = pattern.map(tri, mapped)
            res.push(new State(`(${cs},${tri},${ns},${twi},${pm})`))
        }
        return res
    }

    CompareWithBuffer = (bufferChar: string | undefined): boolean => {
        let res: boolean;
        switch(this.buffer_read){
            case SpecialChar.Empty:
                res = (bufferChar === '' || bufferChar === undefined)
                break;
            case SpecialChar.AnyNotEmpty:
                res = !(bufferChar === '' || bufferChar === undefined)
                break;
            case SpecialChar.Space:
                res = bufferChar === ' ' 
            default:
                res = this.buffer_read == bufferChar
                break;
        }
        return res
    }

    GetCharacterToWrite = (currentChar: string | undefined): string => {
        switch(this.buffer_write){
            case SpecialChar.Empty:
                return currentChar || ''
            case SpecialChar.Space:
                return ' '
            case SpecialChar.AnyNotEmpty:
                throw new SyntaxError('The Special character AnyNotEmpty is not a writable character')
            default:
                return this.buffer_write
        }
    }
}