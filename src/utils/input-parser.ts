import path from 'path';
import fs from 'fs';

interface InputParserOptions {
    filename: string;
    url: string;
    day: number;
    separator: string;
    path: string;
}

const DEFAULTS = {
    path: 'src/inputs',
    fileExtension: 'txt',
    SESSION_COOKIE:
        'session=53616c7465645f5f3a9276c6b97a36cd586508b52960c5a44da47d33a2bdbe4fb36f9396aec05309f8e377ffc5a6bdc302c9127a1eeee5bf38513ca119ae968b; ',
};

export default class InputParser {
    private _options: Partial<InputParserOptions>;
    private _separator: string[];
    private _filename: string | null = null;
    private path: string;
    public file: string | null;

    constructor(opts?: Partial<InputParserOptions>) {
        this._options = opts ?? {};
        this._filename = opts?.filename
            ? path.basename(opts.filename)
            : this._filename;
        this.path = opts?.path ?? path.resolve(DEFAULTS.path);
        if (opts?.filename) {
            this.file = fs
                .readFileSync(
                    path.join(
                        this.path,
                        `${this._filename}.${DEFAULTS.fileExtension}`
                    )
                )
                ?.toString();
        }
    }

    static async create(
        opts?: Partial<InputParserOptions>
    ): Promise<InputParser> {
        const ip = new InputParser(opts);

        if (opts?.url) {
            const file = await InputParser._fetch(opts.url);
            ip.file = file;
        }

        if (opts?.day) {
            const url = `https://adventofcode.com/2023/day/${opts.day}/input`;
            const file = await InputParser._fetch(url);
            ip.file = file;
        }

        return ip;
    }

    toArray(): string[] {
        if (!this.file) throw Error('No File.');

        // convert to \n if \r\n
        const file = this.file.replace(/\r\n/g, '\n');

        const lines = file.split('\n');

        // pop of an empty element at the end.
        if (lines.at(-1) === '') {
            lines.pop();
        }

        return lines;
    }

    toRaw(): string {
        if (!this.file) throw Error('No File.');

        return this.file;
    }

    private static async _fetch(url: string) {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Cookie: DEFAULTS.SESSION_COOKIE,
            },
        });
        if (res.status !== 200) throw Error(`Bad status: ${res.status}`);

        return await res.text();
    }
}
