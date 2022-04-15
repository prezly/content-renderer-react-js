import React from 'react';
import type { Node } from 'slate';
import { describeNode } from '../lib';

interface Props {
    node: Node;
}

export function Default({ node }: Props) {
    return (
        <div style={{ color: 'red' }}>
            <strong>[@prezly/content-renderer-react-js]</strong> Unknown node type encountered:
            <pre>{describeNode(node)}</pre>
        </div>
    );
}
