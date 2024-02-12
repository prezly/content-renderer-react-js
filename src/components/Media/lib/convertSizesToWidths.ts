const SIZE_DEFINITION_REGEX = /(?:\((?:min|max)-width: \d+px\) ?)?(\d+)(?:px|w)/g;

export function convertSizesToWidths(sizesString: string): number[] {
    const matches = Array.from(sizesString.matchAll(SIZE_DEFINITION_REGEX));

    return matches.map((match) => parseInt(match[1], 10));
}
