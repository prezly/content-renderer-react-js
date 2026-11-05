import { getBackgroundBehind } from './dom';

function mount(html: string): HTMLElement {
    document.body.innerHTML = html;
    return document.getElementById('target') as HTMLElement;
}

describe('getBackgroundBehind', () => {
    afterEach(() => {
        document.body.innerHTML = '';
        document.body.removeAttribute('style');
    });

    it('uses the nearest opaque ancestor background', () => {
        const target = mount(`
            <div style="background-color: rgb(17, 24, 39)">
                <div><img id="target" style="background-color: rgb(255, 0, 0)" /></div>
            </div>
        `);
        expect(getBackgroundBehind(target)).toEqual({ r: 17, g: 24, b: 39 });
    });

    it('defaults to white when no ancestor paints a background', () => {
        expect(getBackgroundBehind(mount('<img id="target" />'))).toEqual({
            r: 255,
            g: 255,
            b: 255,
        });
    });

    it('composites semi-transparent ancestors over the opaque one', () => {
        const target = mount(`
            <div style="background-color: rgb(0, 0, 0)">
                <div style="background-color: rgba(255, 255, 255, 0.5)"><img id="target" /></div>
            </div>
        `);
        expect(getBackgroundBehind(target)).toEqual({ r: 127.5, g: 127.5, b: 127.5 });
    });

    it('returns null when an ancestor paints a background image', () => {
        const target = mount(`
            <div style="background-image: linear-gradient(red, blue)"><img id="target" /></div>
        `);
        expect(getBackgroundBehind(target)).toBeNull();
    });
});
