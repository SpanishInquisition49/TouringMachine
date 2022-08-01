import { StatePattern } from '../src/statePattern'
 
describe('Pattern', () => {
    const patternString = '[a-z]'
    const pattern = new StatePattern(patternString)

    it('Should be defined', () => {
        expect(pattern).toBeDefined()
    })

    it('[a-z] should be a valid pattern', () => {
        expect(StatePattern.isValid(patternString)).toBe(true)
    })

    it('[a] should be an invalid pattern', () => {
        expect(StatePattern.isValid('[a]')).toBe(false)
    })

    it('a-z should be an invalid pattern', () => {
        expect(StatePattern.isValid('a-z')).toBe(false)
    })

    it('Pattern should contains char "b"', () => {
        expect(pattern.contains('b')).toBe(true)
    })

    it('Should map a to 0', () => {
        expect(pattern.map('a', '0')).toBe('0')
    })

    it('Should map f to F', () => {
        const secondPattern = new StatePattern('[A-Z]')
        const mapped = pattern.map('f', secondPattern)
        expect(mapped).toBe('F')
    })

    it('Should map f to C', () => {
        expect(pattern.map('f', new StatePattern('[A-C]'))).toBe('C')
    })

    it('Should map b to a', () => {
        const initialPattern = new StatePattern('[a-b]')
        const reversePattern = new StatePattern('[b-a]')
        const mapped = initialPattern.map('b', reversePattern)
        expect(mapped).toBe('a')
    })

    it('Should map a to b', () => {
        const initialPattern = new StatePattern('[a-b]')
        const reversePattern = new StatePattern('[b-a]')
        const mapped = initialPattern.map('a', reversePattern)
        expect(mapped).toBe('b')
    })

})