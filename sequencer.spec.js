const {
    generator,
    factorial,
    fibonacci,
    range,
    prime,
    partialSum
} = require('./sequence_generator')
const {
    pipeSeq,
    accumulator,
    isEven
} = require('./sequence_piping')

const factorialLiteral = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]
const fibonacciLiteral = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610]
const rangeLiteral = [5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50]
const primeLiteral = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59]
const partialSumLiteral = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

describe("The sequence function", () => {
    it('puts the lotion in the basket', () => {
        const seq = generator(factorial)
        for (let i = 0; i < factorialLiteral.length; i++) {
            const next = seq.next()
            expect(next).toEqual(factorialLiteral[i])
        }
    })

    it('outputs the fibonacci', () => {
        const seq = generator(fibonacci)
        for (let i = 0; i < fibonacciLiteral.length; i++) {
            const next = seq.next()
            expect(next).toEqual(fibonacciLiteral[i])
        }
    })

    it('goes shooting at the range', () => {
        const seq = generator(range, 5, 3)
        for (let i = 0; i < rangeLiteral.length; i++) {
            const next = seq.next()
            expect(next).toEqual(rangeLiteral[i])
        }
    })

    it('primes the pump', () => {
        const seq = generator(prime)
        for (let i = 0; i < primeLiteral.length; i++) {
            const next = seq.next()
            expect(next).toEqual(primeLiteral[i])
        }
    })

    it('sums the partial sequence then throws an error', () => {
        const seq = generator(partialSum, ...partialSumLiteral)
        let sum = 0
        for (let i = 0; i < partialSumLiteral.length; i++) {
            sum += partialSumLiteral[i]
            const next = seq.next()
            expect(next).toEqual(sum)
        }
        expect(seq.next).toThrowError()
    })
})

describe('The sequence pipe', () => {
    const accumulateRangeLiteral = [2, 7, 15, 26]
    it('accumulates the range', () => {
        const pipedSeq = pipeSeq(range, 2, 3)
            .pipeline(accumulator)
            .invoke()

        const seq = generator(pipedSeq)
        for (let i = 0; i < accumulateRangeLiteral.length; i++) {
            const next = seq.next()
            expect(next).toEqual(accumulateRangeLiteral[i])
        }
    })


    it('determines even fibonaccis', () => {
        const pipedSeq = pipeSeq(fibonacci)
            .pipeline(isEven)
            .invoke()

        const seq = generator(pipedSeq)
        for (let i = 0; i < fibonacciLiteral.length; i++) {
            const isEven = fibonacciLiteral[i] % 2 === 0
            const next = seq.next()
            expect(next).toEqual({
                status: isEven,
                number: fibonacciLiteral[i]
            })
        }
    })
})