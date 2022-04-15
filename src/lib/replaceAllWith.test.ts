import { replaceAllWith } from './replaceAllWith';

describe('replaceAllWith', () => {
    it('should return original string if there is no matches', () => {
        expect(replaceAllWith('hello world', [/p/, 1])).toStrictEqual(['hello world']);
    });

    it('should replace one occurrence with object', () => {
        expect(replaceAllWith('hello world', [/ /, { test: 1 }])).toStrictEqual([
            'hello',
            { test: 1 },
            'world',
        ]);
    });

    it('should replace one occurrence at the beginning', () => {
        expect(replaceAllWith('hello world', [/h/, { test: 1 }])).toStrictEqual([
            { test: 1 },
            'ello world',
        ]);
    });

    it('should replace one occurrence at the end', () => {
        expect(replaceAllWith('hello world', [/d/, { test: 1 }])).toStrictEqual([
            'hello worl',
            { test: 1 },
        ]);
    });

    it('should replace two occurrences at at the beginning and at the end', () => {
        expect(replaceAllWith('hello world', [/h/, { test: 1 }], [/d/, { test: 2 }])).toStrictEqual(
            [{ test: 1 }, 'ello worl', { test: 2 }],
        );
    });

    it('should replace two occurrences in a row at the beginning', () => {
        expect(replaceAllWith('hello world', [/h/, { test: 1 }], [/e/, { test: 2 }])).toStrictEqual(
            [{ test: 1 }, { test: 2 }, 'llo world'],
        );
    });

    it('should replace two occurrences in a row at the end', () => {
        expect(
            replaceAllWith('hello world nm', [/n/, { test: 1 }], [/m/, { test: 2 }]),
        ).toStrictEqual(['hello world ', { test: 1 }, { test: 2 }]);
    });

    it('should replace two occurrences in a string which lengths is equal to the quantity of replacers', () => {
        expect(replaceAllWith('he', [/h/, { test: 1 }], [/e/, { test: 2 }])).toStrictEqual([
            { test: 1 },
            { test: 2 },
        ]);
    });

    it('should replace two occurrences with long regexp', () => {
        expect(
            replaceAllWith('one two three', [/one/, { test: 1 }], [/three/, { test: 3 }]),
        ).toStrictEqual([{ test: 1 }, ' two ', { test: 3 }]);
    });

    it('should replace two occurrences where regexp has multiple matches', () => {
        expect(replaceAllWith('qqwe qqwe', [/qq/, { test: 1 }], [/e/, { test: 2 }])).toStrictEqual([
            { test: 1 },
            'w',
            { test: 2 },
            ' ',
            { test: 1 },
            'w',
            { test: 2 },
        ]);
    });
});
