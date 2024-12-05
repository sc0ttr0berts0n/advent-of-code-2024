import InputParser from '../utils/input-parser';

InputParser.create({
    url: 'https://adventofcode.com/2024/day/3/input',
}).then((parser) => {
    const instructions = `do()${parser.toRaw()}`;

    const getSum = (chunk: string) => {
        return chunk
            .match(/mul\(\d{1,3},\d{1,3}\)/gm)
            .map((match) => {
                return match
                    .slice(4, match.length - 1)
                    .split(',')
                    .map(Number);
            })
            .map(([a, b]) => a * b)
            .reduce((acc, el) => {
                return acc + el;
            }, 0);
    };

    const chunks = instructions
        .split('do()')
        .map((chunk) => chunk.split("don't()")[0])
        .filter(Boolean);

    const sum = chunks.map(getSum).reduce((acc, el) => acc + el, 0);

    console.log({ sum });

    debugger;
});
