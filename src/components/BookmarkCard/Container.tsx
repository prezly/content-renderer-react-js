import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React, { useState } from 'react';
import { useResizeObserver } from '@react-hookz/web';

type Layout = 'horizontal' | 'vertical';

interface ContainerProps {
    defaultLayout: Layout;
    hasThumbnail: boolean;
    className?: string;
}

const HORIZONTAL_LAYOUT_MIN_WIDTH = 480;

export function Container({
    defaultLayout,
    children,
    className,
    hasThumbnail,
}: PropsWithChildren<ContainerProps>) {
    const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);
    const [isSmallViewport, setSmallViewport] = useState(false);

    useResizeObserver(cardRef, (entry) => {
        setSmallViewport(entry.contentRect.width < HORIZONTAL_LAYOUT_MIN_WIDTH);
    });

    const actualLayout = getActualLayout(hasThumbnail, isSmallViewport, defaultLayout);

    return (
        <div
            ref={setCardRef}
            className={classNames(className, 'prezly-slate-bookmark-card-component__container', {
                vertical: actualLayout === 'vertical',
                horizontal: actualLayout === 'horizontal',
            })}
        >
            {children}
        </div>
    );
}
function getActualLayout(hasThumbnail: boolean, isSmallViewport: boolean, defaultLayout: Layout): Layout {
    if (!hasThumbnail) {
        return 'horizontal';
    } else if (isSmallViewport) {
        return 'vertical';
    } else {
        return defaultLayout;
    }
}
