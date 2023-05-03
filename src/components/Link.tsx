import { type HTMLProps, type PropsWithChildren } from 'react';

interface Props extends HTMLProps<HTMLAnchorElement> {
    newTab: boolean;
}

export function Link({ newTab, children, ...rest }: PropsWithChildren<Props>) {
    return (
        <a rel="noopener noreferrer" target={newTab ? '_blank' : '_self'} {...rest}>
            {children}
        </a>
    );
}
