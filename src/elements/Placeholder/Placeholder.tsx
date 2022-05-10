import type { PlaceholderNode } from '@prezly/story-content-format';
import React, { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    node: PlaceholderNode;
}

export function Placeholder({ children }: Props) {
    return <>{children}</>;
}
