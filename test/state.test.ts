import { State } from '../src/state'

describe('State', () => {

    const incrementorProgram = State.ReadProgramFromFile('./examples/incrementor.txt')

    it('Should create an array of States', () => {
        const incrementorWithPatternProgram = State.ReadProgramFromFile('./examples/incrementorV2.txt')
        expect(incrementorWithPatternProgram.length).toBe(incrementorProgram.length)
    })
})