class InvalidInputState extends Error {
    constructor() {
        super('Wrong argoument number for State')
    }
}
class AmbigousState extends Error {
    constructor() {
        super('Too many with the same special character')
    }
}

enum Movement{
    Left = '<',
    Right = '>',
    Stay = '_',
}

enum SpecialChar{
    Empty = '_',
    AnyNotEmpty = '**',
}

class State {
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

    CompareWithBuffer = (bufferChar: string): boolean => {
        let res: boolean;
        switch(this.buffer_read){
            case SpecialChar.Empty:
                res = (bufferChar == '' || bufferChar == undefined)
                break;
            case SpecialChar.AnyNotEmpty:
                res = !(bufferChar == '' || bufferChar == undefined)
                break;
            default:
                res = this.buffer_read == bufferChar
                break;
        }
        return res
    }
}

class TuringMachine {
    states: State[];
    buffer: string[];
    buffer_pointer_min_value: number
    pointer_position: number;
    current_state: string;
    speed: number

    constructor(states:State[], b:string, speed:number) {
        this.states = states;
        this.buffer = b.split('');
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
            else throw new AmbigousState();
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
                this.buffer[this.pointer_position] = state.buffer_write == SpecialChar.Empty ? this.bufferAtPointer() : state.buffer_write;
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
}


let s = [
    new State('(0, **, Mov, _, >)'),
    new State('(Mov, **, Mov, _, >)'),
    new State('(Mov, _, Inc, _, <)'),
    new State('(Inc, 0, End, 1, _)'),
    new State('(Inc, 1, End, 2, _)'),
    new State('(Inc, 2, End, 3, _)'),
    new State('(Inc, 3, End, 4, _)'),
    new State('(Inc, 4, End, 5, _)'),
    new State('(Inc, 5, End, 6, _)'),
    new State('(Inc, 6, End, 7, _)'),
    new State('(Inc, 7, End, 8, _)'),
    new State('(Inc, 8, End, 9, _)'),
    new State('(Inc, 9, Inc, 0, <)'),
    new State('(Inc, _, End, 1, _)'),
];

let t = new TuringMachine(s, '12345999', 250);
t.exec();