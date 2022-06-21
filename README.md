# Turing Machine

A simple Turing machine interpreter

## Download

* `git clone https://github.com/SpanishInquisition49/TuringMachine.git`
* if you don't have TypeScript `npm install -g typescript`
* `tsc turing.ts`
* `node ./turing.js`

## How it works

The interpreter take 3 parameters:

```TypeScript
//an array containing all the possible states the machine can take.
states: State[]
// an array of characters representing the initial content of the tape.
tape: string[]
//an integer representing the execution speed in milliseconds.
speed: number 
```

The machine always start with state `0` and the pointer on position `0`. <br/>
The machine stop when it can't change state and it print the content of the tape and the pointer position.

## State Syntax

A state is a 5-tuple of the form `(CS, TR, NS, TW, PM)`:
  
* `CS` or current state is the state that the machine has to have before do the transition.
* `TR` or tape read is the content of the tape that the machine has to have in order to do the transition.
* `NS` or new state is the state that the machine take after the transition.
* `TW` or tape write is the content that will be wrote on the tape durning the transition.
* `PM` or pointer movement is a token representing the direction of the movement which the pointer make during the transition.

  |  Token  | Direction |
  |:-------:|:---------:|
  | `<` |   Left    |
  | `>` |   Right   |
  | `_` |   Stay    |

### Example

`(0, A, 1, B, >)` is equal to: if you are in the state `0` and you are reading `A` then go in the state `1`, write `B` and move the pointer to the right.

## Special Characters

This table contain all the special character usable in the `TR` and `TW`

| Token | Name| Description|Readable|Writable|
|:--------:|:-----------:|:------------------------------------------------:|:-:|:-:
| `**` | AnyNotEmpty | Any character except Empty | :white_check_mark: | :x: |
| `_` | Empty | Empty character | :white_check_mark: | :white_check_mark: |
| `__` | Space | Space character | :white_check_mark: | :white_check_mark: |
| `#` | Comment | if it's the first character in the entire line then the line will be ignored. | :white_check_mark: | :white_check_mark: |
