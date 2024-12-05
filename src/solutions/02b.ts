import InputParser from '../utils/input-parser';

InputParser.create({
    url: 'https://adventofcode.com/2024/day/2/input',
}).then((parser) => {
    const sequences = parser.toArray().map((el) => el.split(' ').map(Number));

    const isSafe = (sequence: number[], isSubset = false): boolean => {
        const allDistanceOfThree = sequence
            .slice(0, sequence.length - 1)
            .every((el, i, arr) => {
                return Math.abs(el - sequence[i + 1]) <= 3;
            });
        const allAscending = sequence
            .slice(0, sequence.length - 1)
            .every((el, i, arr) => {
                return el < sequence[i + 1];
            });
        const allDescending = sequence
            .slice(0, sequence.length - 1)
            .every((el, i, arr) => {
                return el > sequence[i + 1];
            });

        const naturallySafe =
            (allAscending || allDescending) && allDistanceOfThree;

        if (naturallySafe || isSubset) return naturallySafe;

        // dampen safe (remove one el and is now safe?)
        const dampenSafe = sequence.some((_el, i) => {
            const subset = sequence.filter((_el, j) => i !== j);
            return isSafe(subset, true);
        });

        return dampenSafe;
    };

    const safeCount = sequences.filter((el) => isSafe(el)).length;

    console.log({ safeCount });

    debugger;
});
