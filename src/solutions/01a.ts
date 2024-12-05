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

    let distance = 0;

    while (left.length) {
        const leftMin = Math.min(...left);
        const rightMin = Math.min(...right);
        left.splice(left.indexOf(leftMin), 1);
        right.splice(right.indexOf(rightMin), 1);
        distance += Math.abs(leftMin - rightMin);
    }

    console.log({ distance });

    debugger;
});
