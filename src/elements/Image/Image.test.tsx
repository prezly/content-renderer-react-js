import type { ImageNode } from '@prezly/story-content-format';
import renderer from 'react-test-renderer';
import ResizeObserver from 'resize-observer-polyfill';

import { Image } from './Image';

const CAPTION = 'A newsroom team at work';

globalThis.ResizeObserver = ResizeObserver;

function createImageNode(href: string, mimeType = 'image/jpeg'): ImageNode {
    return {
        type: 'image-block',
        href,
        new_tab: true,
        align: 'center',
        layout: 'contained',
        width: '100%',
        file: {
            version: 2,
            uuid: 'cb4879f8-d3ad-4a65-b74f-0afa09c913d5',
            filename: 'newsroom.jpg',
            mime_type: mimeType,
            size: 1024,
            original_width: 1200,
            original_height: 800,
            effects: [],
        },
        children: [{ text: CAPTION }],
    };
}

describe('Image', () => {
    it('uses the caption as alt text for linked images', () => {
        const component = renderer.create(
            <Image node={createImageNode('https://example.com')}>{CAPTION}</Image>,
        );

        expect(component.root.findByType('img').props.alt).toBe(CAPTION);
    });

    it('passes the caption title to previewable media', () => {
        const component = renderer.create(
            <Image node={createImageNode('', 'image/gif')}>{CAPTION}</Image>,
        );

        expect(component.root.findByType('video').props.title).toBe(CAPTION);
    });
});
