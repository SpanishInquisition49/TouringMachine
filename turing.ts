import * as readline from 'node:readline';
import { stdin, stdout } from 'process';
import { AmbiguousState, FileNotFound, InvalidInputState } from './src/errors';
import { StatePattern } from './src/statePattern'
import { Movement, SpecialChar, State } from './src/state'

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});
export class TuringMachine {
    states: State[];
    buffer: string[];
    buffer_pointer_min_value: number
    pointer_position: number;
    current_state: string;
    speed: number

    constructor(states:State[], tape:string, speed:number) {
        this.states = states;
        this.buffer = tape.split('');
        this.pointer_position = 0;
        this.buffer_pointer_min_value = 0;
        this.current_state = '0';
        this.speed = speed;
    }
    private bufferAt = (index: number): string | undefined => {
        return this.buffer[index];
    }

    private bufferAtPointer = (): string | undefined => {
        return this.bufferAt(this.pointer_position);
    }
    private getBufferString = ():string => {
        let res = ''
        for(let i = this.buffer_pointer_min_value; i< this.buffer.length; i++)
            res+= this.buffer[i] != undefined ? this.buffer[i] : '';
        return res
    }
    private printStatus = (): void => {
        console.clear()
        console.log(`Status: ${this.current_state}`);
        console.log(`Buffer: ${this.getBufferString()}`);
        console.log(`Pointer Position: ${this.pointer_position}`);
    }
    private getAvailableTransition = (): State[] => {
        let transition = this.states.filter((el) => el.current_status == this.current_state);
        return transition.length > 1 ? transition : transition.sort((x: State, y: State) => {
            if(x.buffer_read == SpecialChar.AnyNotEmpty && y.buffer_read != SpecialChar.AnyNotEmpty)
                return 1
            else if(x.buffer_read != SpecialChar.AnyNotEmpty && y.buffer_read == SpecialChar.AnyNotEmpty)
                return -1
            else throw new AmbiguousState();
        })
    }
    private movePointer = (m: Movement): void => {
        switch(m){
            case Movement.Left:
                this.pointer_position--;
                break;
            case Movement.Right:
                this.pointer_position++;
                break;
            case Movement.Stay:
            default:
                break;
        }
        this.buffer_pointer_min_value = Math.min(this.buffer_pointer_min_value, this.pointer_position);
    }
    private act = (states: State[]): boolean => {
        for(let state of states){
            if(state.CompareWithBuffer(this.bufferAtPointer())){
                this.buffer[this.pointer_position] = state.GetCharacterToWrite(this.bufferAtPointer())
                this.current_state = state.new_state;
                this.movePointer(state.pointer_movement);
                return true
            }
        }
        return false
    }
    private sleep = (milliseconds: number): void => {
        const date = Date.now();
        let currentDate: number | null = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    exec = (): void => {
        let possibleTransition = this.getAvailableTransition()
        let actDone = true
        while(possibleTransition.length != 0 && actDone){
            this.printStatus();
            actDone = this.act(possibleTransition);
            possibleTransition = this.getAvailableTransition();
            this.sleep(this.speed);
        }
        this.printStatus()
    }
    reset = (): void => {
        this.states = [];
        this.buffer = [''];
        this.pointer_position = 0;
        this.buffer_pointer_min_value = 0;
        this.current_state = '0';
        this.speed = 1000;
    }
    set = (states:State[], tape:string, speed:number): void => {
        this.reset()
        this.states = states;
        this.buffer = tape.split('');
        this.speed = speed;
    }
}

console.clear()
rl.question('Input the program file: ', (input: string) => {
    const programFile = input
    rl.question('Input the initial content of the tape: ', (input: string) => {
        const tapeContent = input
        let t = new TuringMachine(State.ReadProgramFromFile(programFile), tapeContent, 250);
        t.exec();
        rl.close();
    })
})
