import InputParser from '../utils/input-parser';

InputParser.create({
    url: 'https://adventofcode.com/2024/day/4/input',
}).then((parser) => {
    const wordSearch = parser.toArray();

    const search = (grid: string[]): number => {
        const testLocation = (
            pos: { x: number; y: number },
            dir: { x: number; y: number },
            word: string,
            grid: string[]
        ): boolean => {
            const letters = new Array(word.length).fill(0).map((_el, index) => {
                const x = pos.x + index * dir.x;
                const y = pos.y + index * dir.y;
                return grid[y]?.[x];
            });

            return letters.join('') === word;
        };

        let hits = 0;
        for (let y = 0; y < grid.length; y++) {
            const row = grid[y];
            for (let x = 0; x < row.length; x++) {
                hits += [
                    testLocation({ x, y }, { x: -1, y: -1 }, 'XMAS', grid),
                    testLocation({ x, y }, { x: 0, y: -1 }, 'XMAS', grid),
                    testLocation({ x, y }, { x: 1, y: -1 }, 'XMAS', grid),
                    testLocation({ x, y }, { x: -1, y: 0 }, 'XMAS', grid),
                    testLocation({ x, y }, { x: 1, y: 0 }, 'XMAS', grid),
                    testLocation({ x, y }, { x: -1, y: 1 }, 'XMAS', grid),
                    testLocation({ x, y }, { x: 0, y: 1 }, 'XMAS', grid),
                    testLocation({ x, y }, { x: 1, y: 1 }, 'XMAS', grid),
                ].filter(Boolean).length;
            }
        }
        return hits;
    };

    const xmasCount = search(wordSearch);

    console.log({ xmasCount });

    debugger;
});
