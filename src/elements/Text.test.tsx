/** @jest-environment node */
import { renderToStaticMarkup } from 'react-dom/server';

import { Text } from './Text';

it('renders strikethrough combined with existing styles and soft breaks', () => {
    const html = renderToStaticMarkup(
        <Text
            node={{ text: 'old\nannouncement', bold: true, underlined: true, strikethrough: true }}
        />,
    );

    expect(html).toBe('<s><u><strong>old<br/>\u200Bannouncement</strong></u></s>');
});

it('keeps unformatted text unchanged', () => {
    expect(renderToStaticMarkup(<Text node={{ text: 'announcement' }} />)).toBe('announcement');
});
