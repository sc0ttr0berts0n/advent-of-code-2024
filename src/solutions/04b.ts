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

        const findX = (x: number, y: number): boolean => {
            // test the \
            const isMas = testLocation({ x, y }, { x: 1, y: 1 }, 'MAS', grid);
            const isSam = testLocation({ x, y }, { x: 1, y: 1 }, 'SAM', grid);

            // guard
            if (!(isMas || isSam)) return false;

            // test the /
            const isCrossMas = testLocation(
                { x, y: y + 2 },
                { x: 1, y: -1 },
                'MAS',
                grid
            );
            const isCrossSam = testLocation(
                { x, y: y + 2 },
                { x: 1, y: -1 },
                'SAM',
                grid
            );

            return isCrossMas || isCrossSam;
        };

        let hits = 0;
        for (let y = 0; y < grid.length; y++) {
            const row = grid[y];
            for (let x = 0; x < row.length; x++) {
                if (findX(x, y)) {
                    hits++;
                }
            }
        }
        return hits;
    };

    const xmasCount = search(wordSearch);

    console.log({ xmasCount });

    debugger;
});
