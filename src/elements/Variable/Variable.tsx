import type { VariableNode } from '@prezly/story-content-format';
import React, { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    node: VariableNode;
}

export function Variable({ children }: Props) {
    return <>{children}</>;
}
