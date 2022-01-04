import type { PlaceholderNode } from '@prezly/slate-types';
import React, { FunctionComponent, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    node: PlaceholderNode;
}

export const Placeholder: FunctionComponent<Props> = ({ children }) => <>{children}</>;
