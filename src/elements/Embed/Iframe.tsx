import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import { useState } from 'react';

import { HtmlInjection } from '../../components';

import './IframelyEmbed.scss';

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'onError'> {
    children?: never;
    html: string;
}

export const Iframe: FunctionComponent<Props> = ({ className, html, ...attrs }) => {
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
};
