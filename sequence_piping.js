function pipeSeq (sequencer, ...args1) {
    let pipedSequencer
    sequencer = sequencer.bind(sequencer)
    return {
        pipeline: function (pipe, ...args2) {
            pipedSequencer = pipe(...args2)
            return this
        },
        invoke: () => () => pipedSequencer(sequencer(...args1))
    }
}

function accumulator () {
    let sum = 0;
    return function (value) {
        sum += value;
        return sum;
    };
}

function isEven () {
    return function (value) {
        return {
            status: value % 2 === 0,
            number: value
        }
    }
}

module.exports = {
    pipeSeq,
    accumulator,
    isEven
}