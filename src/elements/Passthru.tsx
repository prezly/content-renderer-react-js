import type { Node } from '@prezly/story-content-format';
import type { ReactNode } from 'react';

interface Props {
    node: Node;
    children?: ReactNode;
}

export function Passthru({ children }: Props) {
    return <>{children}</>;
}
