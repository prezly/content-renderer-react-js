'use client';

import { useMeasure } from '@react-hookz/web';
import classNames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';

import { MultilineEllipsis } from '..';
import { ArrowsAngleExpand } from '../../icons';

import './Rollover.scss';

interface Props extends ButtonHTMLAttributes<HTMLAnchorElement> {
    caption?: string;
    href: string;
    onClick: () => void;
}

const LINE_HEIGHT = 22;
const MAX_CAPTION_LINES = 3;
const CAPTION_PADDING_TOP = 16;
const CAPTION_PADDING_BOTTOM = 8;
const CAPTION_PADDING_VERTICAL = CAPTION_PADDING_BOTTOM + CAPTION_PADDING_TOP;
const IDEAL_MAX_HEIGHT = MAX_CAPTION_LINES * LINE_HEIGHT;

export function Rollover({
    caption = '',
    children,
    className,
    disabled,
    onClick,
    ...props
}: Props) {
    const [rect, ref] = useMeasure<HTMLSpanElement>();
    const height = rect?.height || 0;
    const captionHeight = height - CAPTION_PADDING_VERTICAL;
    const maxHeight = height > 0 ? Math.min(IDEAL_MAX_HEIGHT, captionHeight) : IDEAL_MAX_HEIGHT;

    if (disabled) {
        return <>{children}</>;
    }

    return (
        <a
            aria-label={caption || 'View image'}
            className={classNames('prezly-slate-image-rollover', className)}
            onClick={(event) => {
                event.preventDefault();
                onClick();
            }}
            {...props}
        >
            <span className="prezly-slate-image-rollover__content">
                {children}

                <span className="prezly-slate-image-rollover__dim" />

                <span
                    className={classNames('prezly-slate-image-rollover__caption', {
                        'prezly-slate-image-rollover__caption--empty': !caption.trim(),
                    })}
                >
                    <span className="prezly-slate-image-rollover__caption-icon-container">
                        <ArrowsAngleExpand
                            aria-hidden="true"
                            className="prezly-slate-image-rollover__caption-icon"
                        />
                    </span>

                    <span className="prezly-slate-image-rollover__caption-text" ref={ref}>
                        <MultilineEllipsis maxHeight={maxHeight}>
                            {caption.trim()}
                        </MultilineEllipsis>
                    </span>
                </span>
            </span>
        </a>
    );
}
