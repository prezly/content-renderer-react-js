import type { VariableNode } from '@prezly/story-content-format';
import type { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    node: VariableNode;
}

export function Variable({ children }: Props) {
    return <>{children}</>;
}
