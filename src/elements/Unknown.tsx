import type { Node } from '@prezly/story-content-format';
import React, { CSSProperties } from 'react';

import { describeNode } from '../lib';

interface Props {
    node: Node;
}

const styles: CSSProperties = {
    background: '#FEE',
    border: '1px solid red',
    color: 'red',
    padding: '1em',
    margin: '1em 0',
};

export function Unknown({ node }: Props) {
    return (
        <div style={styles}>
            <strong>[@prezly/content-renderer-react-js]</strong> Unknown node type encountered:
            <div style={{ fontFamily: 'monospace' }}>{describeNode(node)}</div>
        </div>
    );
}
