import InputParser from '../utils/input-parser';

InputParser.create({
    url: 'https://adventofcode.com/2024/day/2/input',
}).then((parser) => {
    const sequences = parser.toArray().map((el) => el.split(' ').map(Number));

    const isSafe = (sequence: number[]) => {
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

        return (allAscending || allDescending) && allDistanceOfThree;
    };

    const test = [[0, 1, 2, 3, 4]].filter(isSafe).length;
    const safeCount = sequences.filter(isSafe).length;

    console.log({ safeCount });

    debugger;
});
