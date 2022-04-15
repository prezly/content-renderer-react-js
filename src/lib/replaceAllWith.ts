export function replaceAllWith<T>(str: string, ...replacers: Array<[find: RegExp, replace: T]>) {
    let matches: Array<{ index: number; length: number; replace: T }> = [];

    replacers.forEach(([find, replace]) => {
        const matched = Array.from(str.matchAll(new RegExp(find, 'g')));
        matched.forEach((m) => {
            if (m.index !== undefined && m[0].length !== undefined) {
                matches.push({ index: m.index, length: m[0].length, replace });
            }
        });
    });

    if (matches.length === 0) {
        return [str];
    }

    matches = matches.sort((a, b) => a.index - b.index);
    const result: Array<string | T> = [];

    let last = 0;
    let currentMatch = 0;

    do {
        const match = matches.at(currentMatch);

        if (
            last < str.length &&
            // Avoid adding empty string
            last !== match?.index
        ) {
            const subset = str.substring(last, match?.index);
            result.push(subset);
        }

        if (match) {
            result.push(match.replace);
            last = match.index + match.length;
        }

        currentMatch++;
    } while (currentMatch < matches.length + 1); // We should add the last substring from "last" to the end of the string

    return result;
}
