/**
 * @jest-environment node
 */
import { renderToString } from 'react-dom/server';

import { HtmlInjection } from './HtmlInjection';

const HTML =
    '<iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fyoutu.be%2Fabc&amp;key=123"></iframe>';

function noop() {}

describe('HtmlInjection on the server', () => {
    it('renders the same player.js frame address as the client', () => {
        const markup = renderToString(<HtmlInjection html={HTML} onError={noop} onPlay={noop} />);

        expect(markup).toContain('&amp;key=123&amp;playerjs=1');
    });
});
