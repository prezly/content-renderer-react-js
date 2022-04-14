import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React, { useRef, useState } from 'react';
import { useResizeObserver } from '@react-hookz/web';
import { StoryBookmarkLayout } from '@prezly/slate-types';

type ContainerLayout = 'vertical' | 'horizontal';

interface ContainerProps {
    defaultLayout: ContainerLayout;
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
    const card = useRef<HTMLDivElement | null>(null);
    const [isSmallViewport, setSmallViewport] = useState(false);

    useResizeObserver(card.current, function (entry) {
        setSmallViewport(entry.contentRect.width < HORIZONTAL_LAYOUT_MIN_WIDTH);
    });

    const actualLayout = getActualLayout(hasThumbnail, isSmallViewport, defaultLayout);

    return (
        <div
            ref={card}
            className={classNames(className, 'prezly-slate-bookmark-card-component__container', {
                vertical: actualLayout === 'vertical',
                horizontal: actualLayout === 'horizontal',
            })}
        >
            {children}
        </div>
    );
}
function getActualLayout(hasThumbnail: boolean, isSmallViewport: boolean, defaultLayout: string) {
    if (!hasThumbnail) {
        return StoryBookmarkLayout.HORIZONTAL;
    } else if (isSmallViewport) {
        return StoryBookmarkLayout.VERTICAL;
    } else {
        return defaultLayout;
    }
}
