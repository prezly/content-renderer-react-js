'use client';

import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import { useState } from 'react';

import { HtmlInjection } from '../../components';

import './IframelyEmbed.scss';

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'onError'> {
    html: string;
}

export function Iframe({ className, html, ...attrs }: Props) {
    const [hasError, setHasError] = useState<boolean>(false);

    return (
        <HtmlInjection
            className={classNames('prezly-slate-iframely-embed', className, {
                'prezly-slate-iframely-embed--error': hasError,
            })}
            html={html}
            {...attrs}
            onError={() => setHasError(true)}
        />
    );
}
