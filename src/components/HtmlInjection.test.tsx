import { render } from '@testing-library/react';

import { HtmlInjection } from './HtmlInjection';

const HTML =
    '<iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fyoutu.be%2Fabc&amp;key=123"></iframe>';

function noop() {}

describe('HtmlInjection', () => {
    it('enables player.js on Iframely frames when play is tracked', () => {
        const { container } = render(<HtmlInjection html={HTML} onError={noop} onPlay={noop} />);

        expect(container.querySelector('iframe')?.getAttribute('src')).toContain('&playerjs=1');
    });

    it('leaves the frame address unchanged when play is not tracked', () => {
        const { container } = render(<HtmlInjection html={HTML} onError={noop} />);

        expect(container.querySelector('iframe')?.getAttribute('src')).not.toContain('playerjs');
    });
});
