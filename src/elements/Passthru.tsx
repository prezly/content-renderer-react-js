import type { ReactNode } from 'react';
import React from 'react';
import type { Node } from 'slate';

interface Props {
    node: Node;
    children?: ReactNode;
}

export function Passthru({ children }: Props) {
    return <>{children}</>;
}
