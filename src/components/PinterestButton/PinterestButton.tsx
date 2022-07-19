import classNames from 'classnames';
import React, { AnchorHTMLAttributes, MouseEvent, useCallback } from 'react';

import { Pinterest } from '../../icons';
import { openWindow } from '../../lib';

import { getPinterestShareUrl } from './lib';
import './PinterestButton.scss';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: never;
    description?: string;
    image: string;
    url?: string;
}

export function PinterestButton({ className, description, image, url, onClick, ...props }: Props) {
    const pinterestShareUrl = getPinterestShareUrl({
        description,
        image,
        url,
    });

    const handlePinterestClick = useCallback(
        (event: MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();

            openWindow(pinterestShareUrl, 575, 400);

            if (onClick) {
                onClick(event);
            }
        },
        [onClick],
    );

    return (
        <a
            className={classNames('prezly-slate-pinterest-button', className)}
            href={pinterestShareUrl}
            onClick={handlePinterestClick}
            rel="noreferrer noopener"
            target="_blank"
            title="Save this Pin!"
            {...props}
        >
            <Pinterest className="prezly-slate-pinterest-button__icon" />
        </a>
    );
}
