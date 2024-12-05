import InputParser from '../utils/input-parser';

InputParser.create({
    url: 'https://adventofcode.com/2024/day/1/input',
}).then((parser) => {
    const values = parser.toArray();

    const [left, right] = values.reduce<number[][]>(
        (acc, el) => {
            const [left, right] = el.split('   ');
            acc[0].push(Number(left));
            acc[1].push(Number(right));
            return acc;
        },
        [[], []]
    );

    const similarity = left.reduce((acc, leftNum) => {
        return acc + leftNum * right.filter((el) => el === leftNum).length;
    }, 0);

    console.log({ similarity });

    debugger;
});
