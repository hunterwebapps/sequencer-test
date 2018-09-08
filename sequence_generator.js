// Main generator function
function generator (sequencer, ...args) {
    step = 0
    prev = null
    return {
        next: () => sequencer(...args)
    }
}

// Generator sequencers
function factorial () {
    if (prev === null)
        return prev = step = 1

    const next = step * prev
    prev = next
    step += 1
    return next
}

function fibonacci () {
    if (prev === null) {
        prev = 0
        return step = 1
    }

    const next = step + prev
    prev = step
    step = next
    return next
}

function range (start, step) {
    if (prev === null)
        return prev = start

    const next = prev += step
    prev = next
    return next
}

function prime () {
    if (step === 0)
        step = 1
    do {
        let prime = true
        step += 1
        for (let i = 2; i <= Math.sqrt(step); i++) {
            if (step % i === 0) {
                prime = false
                break
            }
        }
        if (prime) return step
    } while (true)
}

function partialSum (...args) {
    if (step === args.length)
        throw new Error('Past end of sequence. You should break when your iterations have exceeded the number of arguments passed into the sequence generator.')

    const next = args[step] + prev
    prev = next
    step += 1

    return next
}

module.exports = {
    generator,
    factorial,
    fibonacci,
    range,
    prime,
    partialSum
}
