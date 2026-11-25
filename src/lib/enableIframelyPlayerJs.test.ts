import { enableIframelyPlayerJs } from './enableIframelyPlayerJs';

const ADDRESS = '//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fyoutu.be%2Fabc&amp;key=123';

describe('enableIframelyPlayerJs', () => {
    it('adds the player.js option to Iframely frame addresses', () => {
        expect(enableIframelyPlayerJs(`<iframe src="${ADDRESS}" allowfullscreen></iframe>`)).toBe(
            `<iframe src="${ADDRESS}&amp;playerjs=1" allowfullscreen></iframe>`,
        );
    });

    it('supports absolute addresses, unescaped ampersands and single quotes', () => {
        const address = 'https://iframe.ly/api/iframe?url=https%3A%2F%2Fvimeo.com%2F1&key=123';

        expect(enableIframelyPlayerJs(`<iframe src='${address}'></iframe>`)).toBe(
            `<iframe src='${address}&amp;playerjs=1'></iframe>`,
        );
    });

    it('supports the format of current Prezly stories (iframely.net, lazy, with a preview image)', () => {
        const address = 'https://iframely.net/api/iframe?url=https%3A%2F%2Fyoutu.be%2Fabc&key=123';
        const html =
            `<div><div style="position: relative;"><iframe data-iframely-url="${address}" data-img allowfullscreen></iframe></div></div>` +
            '<script async src="https://iframely.net/embed.js" charset="utf-8"></script>';

        expect(enableIframelyPlayerJs(html)).toBe(
            html.replace(address, `${address}&amp;playerjs=1`),
        );
    });

    it.each(['cdn.iframe.ly', 'iframe.ly', 'if-cdn.com', 'iframely.net'])(
        'supports the Iframely host %s',
        (host) => {
            const address = `https://${host}/api/iframe?url=x&key=123`;

            expect(enableIframelyPlayerJs(`<iframe src="${address}"></iframe>`)).toBe(
                `<iframe src="${address}&amp;playerjs=1"></iframe>`,
            );
        },
    );

    it('adds the option to addresses the Iframely embed script loads', () => {
        expect(enableIframelyPlayerJs(`<a data-iframely-url="${ADDRESS}"></a>`)).toBe(
            `<a data-iframely-url="${ADDRESS}&amp;playerjs=1"></a>`,
        );
    });

    it('leaves addresses that already set the option unchanged', () => {
        const html = `<iframe src="${ADDRESS}&amp;playerjs=0"></iframe>`;

        expect(enableIframelyPlayerJs(html)).toBe(html);
    });

    it('leaves the Iframely embed script and other frames unchanged', () => {
        const html =
            '<iframe src="https://www.youtube.com/embed/abc"></iframe>' +
            '<iframe src="https://notiframely.net/api/iframe?url=x"></iframe>' +
            '<script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>' +
            '<script async src="https://iframely.net/embed.js" charset="utf-8"></script>';

        expect(enableIframelyPlayerJs(html)).toBe(html);
    });
});
