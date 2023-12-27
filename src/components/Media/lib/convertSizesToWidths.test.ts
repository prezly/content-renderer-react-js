import { convertSizesToWidths } from './convertSizesToWidths';

describe('convertSizesToWidths', () => {
    it('Returns empty array when `sizes` does not contain valid size defintions', () => {
        expect(convertSizesToWidths('')).toEqual([]);
        expect(convertSizesToWidths('test string 123')).toEqual([]);
        expect(convertSizesToWidths('test, 123')).toEqual([]);
    });

    it('Returns array of width numbers when `sizes` is a valid size definition', () => {
        expect(
            convertSizesToWidths('(max-width: 992px) 800px, (max-width: 576px) 400px, 1200px'),
        ).toEqual([800, 400, 1200]);
        expect(
            convertSizesToWidths('(max-width: 992px) 800w, (max-width: 576px) 400w, 100vw'),
        ).toEqual([800, 400]);
    });

    it('Returns array of width numbers when `sizes` has just one size definition', () => {
        expect(convertSizesToWidths('1200px')).toEqual([1200]);
    });
});
